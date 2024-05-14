import "./menu.scss";

import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import IconButton from "../components/forms/iconButton/IconButton";
import clsx from "clsx";

const Menu = () => {
	const { pathname } = useLocation();

	const [isVisibleMobile, setVisibleMobile] = useState(false);

	useEffect(() => {
		setVisibleMobile(false);
	}, [pathname]);

	return (
		<div id="menu" className={clsx({ "visible-mobile": isVisibleMobile })}>
			<nav>
				<NavLink to="/">Dictionnaire</NavLink>
				<NavLink to="/listes">Listes</NavLink>
				<NavLink to="/placements">Placements</NavLink>
			</nav>
			<IconButton
				icon={isVisibleMobile ? "close" : "menu"}
				onClick={() => {
					setVisibleMobile((prev) => !prev);
				}}
			/>
		</div>
	);
};

export default Menu;
