import Icon, { type IconHOC } from "../Icon";

const CloseIcon: IconHOC = ({ label }) => {
	return <Icon name="close" label={label ?? "Fermer"} />;
};

export default CloseIcon;
