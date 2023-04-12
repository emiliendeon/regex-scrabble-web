import "./menu.scss";

import { NavLink } from "react-router-dom";

const Menu = () => {
	return (
		<div id="menu">
			<NavLink to="/">Dictionnaire</NavLink>
			<NavLink to="/placements">Placements</NavLink>
		</div>
	);
};

export default Menu;
