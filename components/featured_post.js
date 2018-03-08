import React from "react";
import Link from "next/link";
import { slugDate } from "../utils/utils-general.js";

export default ({ post, layout }) => {
  const date_slug = slugDate(post.posted);
  if (post.img) {
    let splits = post.img.split(".");
    let extension = splits[splits.length - 1].toLowerCase();
    if (extension === "mp4") video_check = true;
  }
  return (
    <div  key={post.posted}>
    </div>
  );
};
