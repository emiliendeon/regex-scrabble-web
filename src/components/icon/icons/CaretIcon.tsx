import "./caretIcon.scss";
import Icon, { type IconHOC, type IconHOCProps } from "../Icon";

type CaretIconProps = IconHOCProps & {
	orientation: "up" | "right" | "down" | "left";
};

const CaretIcon: IconHOC<CaretIconProps> = ({ label, orientation }: CaretIconProps) => {
	return (
		<Icon
			className={orientation}
			name={"caret"}
			label={label ?? "Voir le détail"}
			showTitle={false}
		/>
	);
};

export default CaretIcon;
