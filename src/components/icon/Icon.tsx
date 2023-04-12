import "./icon.scss";

import { type IconName } from "../../types/icon";
import { type PropsWithClassName } from "../../types/component";

type IconProps = PropsWithClassName<{
	name: IconName;
	label: string;
	showTitle?: boolean;
}>;

export type IconHOCProps = Partial<Pick<IconProps, "label">>;

type IconBaseComponent = (props: IconProps) => React.ReactElement<"img">;
export type IconHOC<T extends IconHOCProps = IconHOCProps> = (
	props: T
) => React.ReactElement<IconBaseComponent>;

const Icon: IconBaseComponent = ({ className, name, label, showTitle }: IconProps) => {
	return (
		<img
			className={`icon ${name}-icon ${className ?? ""}`}
			src={`/assets/icons/${name}.png`}
			alt={label}
			title={showTitle === false ? undefined : label}
		/>
	);
};

export default Icon;
