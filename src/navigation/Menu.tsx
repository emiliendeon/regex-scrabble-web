import "./menu.scss";

import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import IconButton from "../components/forms/iconButton/IconButton";
import clsx from "clsx";

const Menu = () => {
	const { pathname } = useLocation();

	const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

	useEffect(() => {
		setMobileMenuVisible(false);
	}, [pathname]);

	return (
		<div id="menu" className={clsx({ "mobile-menu-visible": isMobileMenuVisible })}>
			<nav>
				<NavLink to="/">Dictionnaire</NavLink>
				<NavLink to="/placements">Placements</NavLink>
			</nav>
			<IconButton
				icon={isMobileMenuVisible ? "close" : "menu"}
				onClick={() => {
					setMobileMenuVisible((prev) => !prev);
				}}
			/>
		</div>
	);
};

export default Menu;