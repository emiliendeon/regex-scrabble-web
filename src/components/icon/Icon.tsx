import "./icon.scss";

import { type IconName } from "../../types/icon";

type IconProps = {
	name: IconName;
	label: string;
};

type IconBaseComponent = (props: IconProps) => React.ReactElement<"img">;
export type IconHOC = (props: { label?: string }) => React.ReactElement<IconBaseComponent>;

const Icon: IconBaseComponent = ({ name, label }: IconProps) => {
	return (
		<img
			className={`icon ${name}-icon`}
			src={`/assets/icons/${name}.png`}
			alt={label}
			title={label}
		/>
	);
};

export default Icon;
