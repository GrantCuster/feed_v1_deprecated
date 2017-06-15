// ./pages/_document.js
import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width" />
          <link rel="stylesheet" type="text/css" href="/static/basscss.min.css" />
          <link rel="stylesheet" type="text/css" href="/static/global.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}