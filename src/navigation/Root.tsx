import { Outlet, useLocation } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import Meta from "../utils/meta";
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
			<Outlet />
		</>
	);
};

export default Root;
