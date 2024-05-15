import "./caretIcon.scss";
import Icon, { type IconHOC, type IconHOCProps } from "../Icon";
import { type Orientable } from "../../../types/component";

type CaretIconProps = Orientable<IconHOCProps>;

const CaretIcon: IconHOC<CaretIconProps> = ({ label, showTitle, orientation }: CaretIconProps) => {
	return <Icon name="caret" label={label} showTitle={showTitle} orientation={orientation} />;
};

export default CaretIcon;
