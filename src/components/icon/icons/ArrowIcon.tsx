import "./arrowIcon.scss";
import Icon, { type IconHOC, type IconHOCProps } from "../Icon";
import { type Orientable } from "../../../types/component";

type ArrowIconProps = Orientable<IconHOCProps>;

const ArrowIcon: IconHOC<ArrowIconProps> = ({ label, showTitle, orientation }: ArrowIconProps) => {
	return <Icon name="arrow" label={label} showTitle={showTitle} orientation={orientation} />;
};

export default ArrowIcon;
