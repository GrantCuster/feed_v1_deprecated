export const slugDate = date_string => {
  const date = new Date(date_string);
  const slug_date = date
    .toISOString()
    .replace(/-/g, "")
    .replace(/:/g, "")
    .replace(/\./g, "");
  return slug_date;
};

export const makeBaseUrl = req => {
  let baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
  if (req && req.get("Host").indexOf(":") === -1) baseUrl = baseUrl + ":8080";
  return baseUrl;
};

export const extractHostname = url => {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("://") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  hostname.replace(/www\./, "");

  return hostname;
};
