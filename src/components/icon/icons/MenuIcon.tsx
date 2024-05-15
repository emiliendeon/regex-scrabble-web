import Icon, { type IconHOC } from "../Icon";

const MenuIcon: IconHOC = ({ label, showTitle }) => {
	return <Icon name="menu" label={label} showTitle={showTitle} />;
};

export default MenuIcon;
