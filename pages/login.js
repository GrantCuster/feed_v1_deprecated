import React from "react";
import Nav from "../components/nav";
import Link from "next/link";

export default ({ url }) => {
	return (
		<div>
			<Nav url={url} />
			<div className="center mb3">
				<h1>Login</h1>
			</div>
			<div>
				<Link href="/login/twitter"><a>Login with Twitter</a></Link>
			</div>
		</div>
	);
};
