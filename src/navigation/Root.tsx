import { Outlet, useLocation } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import Menu from "./Menu";
import Meta from "../utils/meta";
import { SocialIcon } from "react-social-icons";
import { useMemo } from "react";

const Root = () => {
	const { pathname } = useLocation();

	const canonicalUrl = useMemo(() => {
		return `${Meta.baseUrl}${pathname}`;
	}, [pathname]);

	return (
		<>
			<Helmet>
				<link rel="canonical" href={canonicalUrl} />
				<meta property="og:url" content={canonicalUrl} />
				<meta property="og:title" content={Meta.title} />
				<title>{Meta.title}</title>
			</Helmet>
			<Menu />
			<div id="content">
				<Outlet />
			</div>
			<SocialIcon
				url="https://github.com/emiliendeon/regex-scrabble-web"
				label="Voir le projet GitHub"
			/>
		</>
	);
};

export default Root;
