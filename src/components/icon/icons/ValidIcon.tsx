import Icon, { type IconHOC } from "../Icon";

const ValidIcon: IconHOC = ({ label, showTitle }) => {
	return <Icon name="valid" label={label} showTitle={showTitle} />;
};

export default ValidIcon;
