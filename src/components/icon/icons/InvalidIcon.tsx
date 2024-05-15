import Icon, { type IconHOC } from "../Icon";

const InvalidIcon: IconHOC = ({ label, showTitle }) => {
	return <Icon name="invalid" label={label} showTitle={showTitle} />;
};

export default InvalidIcon;
