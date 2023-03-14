import Icon, { type IconHOC } from "../Icon";

const InvalidIcon: IconHOC = ({ label }) => {
	return <Icon name="invalid" label={label ?? "Invalide"} />;
};

export default InvalidIcon;
