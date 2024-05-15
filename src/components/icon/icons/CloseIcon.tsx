import Icon, { type IconHOC } from "../Icon";

const CloseIcon: IconHOC = ({ label, showTitle }) => {
	return <Icon name="close" label={label} showTitle={showTitle} />;
};

export default CloseIcon;
