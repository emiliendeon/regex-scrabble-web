import "./arrowIcon.scss";
import Icon, { type IconHOC, type IconHOCProps } from "../Icon";
import { type Orientable } from "../../../types/component";

type ArrowIconProps = Orientable<IconHOCProps>;

const ArrowIcon: IconHOC<ArrowIconProps> = ({ label, orientation }: ArrowIconProps) => {
	return (
		<Icon
			className={orientation}
			name={"arrow"}
			label={label ?? "Voir le détail"}
			showTitle={false}
		/>
	);
};

export default ArrowIcon;
