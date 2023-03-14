import Icon, { type IconHOC } from "../Icon";

const ValidIcon: IconHOC = ({ label }) => {
	return <Icon name="valid" label={label ?? "Valide"} />;
};

export default ValidIcon;
