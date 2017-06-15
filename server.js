const express = require("express");
const passport = require("passport");
const Strategy = require("passport-twitter").Strategy;
const next = require("next");
const fs = require("fs");
const yaml = require("js-yaml");
const ensure = require("connect-ensure-login");
const multer = require("multer");
const request = require("request");
const TwitterPackage = require("twitter");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

let secret;
if (process.env.NOW) {
  secret = {
    consumer_key: process.env.consumerKey,
    consumer_secret: process.env.consumerSecret,
    access_token_key: process.env.token,
    access_token_secret: process.env.secret,
    session_secret: process.env.sessionSecret
  };
} else {
  const keys = require("../local_keys");
  secret = {
    consumer_key: keys.consumerKey,
    consumer_secret: keys.consumerSecret,
    access_token_key: keys.token,
    access_token_secret: keys.secret,
    session_secret: keys.sessionSecret
  };
}
const Twitter = new TwitterPackage(secret);

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const postTweet = post => {
  console.log("post tweet");
  const domain = "http://feed.grantcuster.com";
  var status =
    "Feed → " +
    capitalizeFirstLetter(post.type) +
    " ↓ " +
    domain +
    "/posts/" +
    post.posted;
  if (post.src && post.src.length > 0) {
    status += " from " + post.src;
  }
  var path_name = "." + post.img;
  var img_data = fs.readFileSync(path_name);

  Twitter.post("media/upload", { media: img_data }, function(
    error,
    media,
    response
  ) {
    if (!error) {
      var the_tweet = {
        status: status,
        media_ids: media.media_id_string
      };
      Twitter.post("statuses/update", the_tweet, function(
        error,
        tweet,
        response
      ) {
        if (!error) {
          console.log(tweet);
        }
      });
    }
  });
};

passport.use(
  new Strategy(
    {
      consumerKey: secret.consumer_key,
      consumerSecret: secret.consumer_secret,
      callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, cb) {
      if (profile.username !== "GrantCuster") {
        return cb(null, false);
      }
      return cb(null, profile.username);
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/images/feed");
  },
  filename: (req, file, cb) => {
    var extension = "." + file.mimetype.split("/")[1];
    var name = file.originalname.replace(extension, "");
    var test = name + "-" + Date.now() + extension;
    cb(null, test);
  }
});

const downloadName = url => {
  const filename = decodeURIComponent(url.split("\\").pop().split("/").pop());
  const filename_split = filename.split(".");
  const filename_dated =
    filename_split[0] + "-" + Date.now() + "." + filename_split[1];
  return filename_dated;
};

const upload = multer({ storage: storage });

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json()); // support json encoded bodies
  server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  server.use(cookieParser());
  server.use(
    cookieSession({
      name: "session",
      secret: secret.session_secret,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
  );

  server.use(passport.initialize());
  server.use(passport.session());

  server.get("/api/list_writings", (req, res) => {
    const file_list = fs.readdirSync("./static/writing/");
    const files = file_list.map(filename => {
      const file = fs.readFileSync(`./static/writing/${filename}`, "utf8");
      const contents = file.split("---");
      const meta = Object.assign(yaml.safeLoad(contents[1]), { filename });
      return { meta: meta, content: contents[2] };
    });
    return res.json(files);
  });

  server.get("/api/writing/:file_slug", (req, res) => {
    const filename = req.params.file_slug;
    const file = fs.readFileSync(`./static/writing/${filename}`, "utf8");
    const contents = file.split("---");
    const meta = Object.assign(yaml.safeLoad(contents[1]), { filename });
    const file_obj = { meta: meta, content: contents[2] };
    return res.json(file_obj);
  });

  // ensure.ensureLoggedIn()
  server.post("/api/private/post", [upload.single("image")], (req, res) => {
    const makePost = post_object => {
      fs.readFile("./static/feed_posts.json", (err, data) => {
        if (err) throw err;
        // Make backup
        const backup_file_name = Date.now() + ".json";
        fs.writeFile(`./static/feed/backups/${backup_file_name}`, data, err => {
          if (err) throw err;
          const posts = JSON.parse(data);
          posts.unshift(post_object);
          const new_posts = JSON.stringify(posts);
          fs.writeFile("./static/feed_posts.json", new_posts, err => {
            if (err) throw err;
            console.log("The file has been saved!");
            if (post_object.tweet === "true") {
              delete post_object.tweet;
              postTweet(post_object);
            }
          });
        });
      });
    };

    const post_object = Object.assign({}, req.body);
    post_object.posted = Date.now();
    console.log(post_object);

    if (req.file === undefined) {
      request.head(req.body.download_url, (err, res, body) => {
        const filename = downloadName(req.body.download_url);
        post_object.img = "/static/images/feed/" + filename;
        request(req.body.download_url)
          .pipe(fs.createWriteStream("./static/images/feed/" + filename))
          .on("close", () => {
            delete post_object.download_url;
            makePost(post_object);
          });
      });
    } else {
      post_object.img = "/" + req.file.path;
      makePost(post_object);
    }
    return res.json({ test: "test" });
  });

  server.get("/login", (req, res) => {
    app.render(req, res, "/login", req.query);
  });

  server.get("/login/twitter", passport.authenticate("twitter"));

  server.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/admin");
    }
  );

  // ensure.ensureLoggedIn()
  server.get("/admin", (req, res) => {
    app.render(
      req,
      res,
      "/admin",
      Object.assign({}, { user: req.user }, req.query)
    );
  });

  server.get("/writing/:file_slug", (req, res) => {
    return app.render(
      req,
      res,
      "/writing_page",
      Object.assign({}, req.params, req.query)
    );
  });

  server.get("/post/:date_slug", (req, res) => {
    return app.render(
      req,
      res,
      "/feed_post_page",
      Object.assign({}, req.params, req.query)
    );
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
