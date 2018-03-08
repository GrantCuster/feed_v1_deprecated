import React from "react";
import Link from "next/link";
import { slugDate } from "../utils/utils-general.js";

export default ({ post, layout }) => {
  const date_slug = slugDate(post.posted);
  return (
    <div className={``} key={post.posted}>
      post
    </div>
  );
};
