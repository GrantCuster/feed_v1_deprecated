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
const keys = require("../local_keys");
const path = require("path");

const slugDate = (date_string) => {
  const date = new Date(date_string);
  const slug_date = date.toISOString().replace(/-/g,'').replace(/:/g,'').replace(/\./g,'');
  return slug_date;
}

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.NODE_ENV === "production" ? 8080 : 3000;

const secret = {
  consumer_key: keys.consumerKey,
  consumer_secret: keys.consumerSecret,
  access_token_key: keys.token,
  access_token_secret: keys.secret,
  session_secret: keys.sessionSecret
};

const Twitter = new TwitterPackage(secret);

const postTweet = post => {
  const domain = "http://feed.grantcuster.com";
  const date_slug = slugDate(post.posted);
  var preamble = "Feed → " +
    capitalizeFirstLetter(post.type) +
    " ↓ ";
  var link = domain + "/post/" + (date_slug);

  var additional = "";
  if (post.src && post.src.length > 0) {
    additional += " from " + post.src;
  }
  if (post.via && post.via.length > 0) {
    additional += " via " + post.via;
  }
  var path_name = "." + post.img;

  var message_no_text = preamble + link + additional;

  var count_no_text = preamble.length + 23 + additional.length ;
  var characters_left = 140 - count_no_text;

  var text = "";
  if (post.text && post.text.length > 0) text = " " + post.text;
  var text_length = text.length;

  var message = "";
  if (text_length > characters_left) {
    text = text.substring(0, characters_left - 3).trim() + "...";
  }

  message = preamble + link + text + additional;

  var img_data = fs.readFileSync(path_name);
  Twitter.post("media/upload", { media: img_data }, function(
    error,
    media,
    response
  ) {
    if (!error) {
      var the_tweet = {
        status: message,
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
      callbackURL: "/auth/twitter/callback"
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
    file_list.reverse();
    const files = file_list.map(filename => {
      const file = fs.readFileSync(`./static/writing/${filename}`, "utf8");
      const contents = file.split("---");
      const meta = Object.assign(yaml.safeLoad(contents[1]), { filename });
      return { meta: meta, content: contents[2] };
    });
    return res.json(files);
  });

  server.get("/api/feed_posts", (req, res) => {
    const data = fs.readFileSync("./static/feed_posts.json", "utf8");
    const posts = JSON.parse(data);
    return res.json(posts);
  });

  server.get("/api/writing/:file_slug", (req, res) => {
    const filename = req.params.file_slug;
    const file = fs.readFileSync(`./static/writing/${filename}`, "utf8");
    const contents = file.split("---");
    const meta = Object.assign(yaml.safeLoad(contents[1]), { filename });
    const file_obj = { meta: meta, content: contents[2] };
    return res.json(file_obj);
  });

  server.get("/api/project_ideas", (req, res) => {
    const file = fs.readFileSync(`./static/project_ideas.md`, "utf8");
    return res.json(file);
  })

  server.post("/api/project_ideas", ensure.ensureLoggedIn(), (req, res) => {
    const ideas_text = req.body.ideas_text;
    fs.writeFile("./static/project_ideas.md", ideas_text, err => {
      if (err) console.log(err);
      return res.json(req.body);
    });
  })

  server.post("/api/private/post", [upload.single("image"), ensure.ensureLoggedIn()
], (req, res) => {
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

  server.get("/admin/project_ideas", ensure.ensureLoggedIn(), (req, res) => {
    return app.render(
      req,
      res,
      "/project_ideas_admin",
      Object.assign({}, { user: req.user }, req.query)
    );
  });

  server.get("/admin", ensure.ensureLoggedIn(), (req, res) => {
    return app.render(
      req,
      res,
      "/admin",
      Object.assign({}, { user: req.user }, req.query)
    );
  });

  server.get("/project_ideas", (req, res) => {
    return app.render(
      req,
      res,
      "/project_ideas",
      req.query
    );
  });

  server.get("/evolving_button", (req, res) => {
    return app.render(
      req,
      res,
      "/evolving_button",
      req.query
    );
  });

  server.get("/cityand/v1", (req, res) => {
    res.sendFile(path.join(__dirname + '/static/cityand_files/v1/index.html'));
  });

  server.get("/cityand/v2", (req, res) => {
    res.sendFile(path.join(__dirname + '/static/cityand_files/v2/index.html'));
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

  server.listen(port, (err) => {
    if (err) throw err;
    console.log('Ready on port ' + port);
  });
});
