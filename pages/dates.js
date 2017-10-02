import React from "react";
import Head from "next/head";
import Nav from "../components/nav";

export default ({ url }) => {
  return (
    <Nav url={url} />
    <div>
      Dates
</div>
  )
}
