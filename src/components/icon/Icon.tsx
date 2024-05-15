import "./icon.scss";

import { type IconName } from "../../types/icon";
import { type Orientable } from "../../types/component";
import clsx from "clsx";
import { computeIconLabel } from "../../utils/icon";
import { useMemo } from "react";

type IconProps = Orientable<{
	name: IconName;
	label?: string;
	showTitle?: boolean;
}>;

export type IconHOCProps = Partial<Pick<IconProps, "label" | "showTitle">>;

type IconBaseComponent = (props: IconProps) => React.ReactElement<"img">;
export type IconHOC<T extends IconHOCProps = IconHOCProps> = (
	props: T
) => React.ReactElement<IconBaseComponent>;

const Icon: IconBaseComponent = ({ name, label, showTitle, orientation }: IconProps) => {
	const labelComputed = useMemo(() => {
		return label ?? computeIconLabel(name, orientation);
	}, [name, label, orientation]);

	return (
		<img
			className={clsx("icon", `${name}-icon`, orientation)}
			src={`/assets/icons/${name}.png`}
			alt={labelComputed}
			title={showTitle ? labelComputed : undefined}
		/>
	);
};

export default Icon;
