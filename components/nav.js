import React from "react";
import Link from "next/link";

export default ({ url }) => {
	return (
		<div className="flex justify-between mb2">
			<div className="px2 bold">
				<Link prefetch href="/">
					<a className="no-underline py2 block">Grant Custer</a>
				</Link>
			</div>
			<div className="flex px1">
				<div className="px1">
					<Link prefetch href="/">
						<a className={`${url.pathname === "/" ? "link-active" : ""} py2 block`}>Feed</a>
					</Link>
				</div>
				<div className="px1">
					<Link prefetch href="/info">
						<a className={`${url.pathname === "/info" ? "link-active" : ""} py2 block`}>Info</a>
					</Link>
				</div>
				<div className="px1">
					<Link prefetch href="/writing">
						<a className={`${url.pathname === "/writing" ? "link-active" : ""} py2 block`}>Writing</a>
					</Link>
				</div>
				<div className="px1">
					<Link prefetch href="/misc">
						<a className={`${url.pathname === "/misc" ? "link-active" : ""} py2 block`}>Misc</a>
					</Link>
				</div>
				<div className="px1">
					<a className="py2 block" href="http://twitter.com/grantcuster">Twitter→</a>
				</div>
			</div>
		</div>
	);
};
