import Icon, { type IconHOC } from "../Icon";

const MenuIcon: IconHOC = ({ label }) => {
	return <Icon name="menu" label={label ?? "Menu"} />;
};

export default MenuIcon;
