import "./iconButton.scss";

import { type ButtonProps } from "../button/Button";
import CaretIcon from "../../icon/icons/CaretIcon";
import CloseIcon from "../../icon/icons/CloseIcon";
import { type IconName } from "../../../types/icon";
import InvalidIcon from "../../icon/icons/InvalidIcon";
import ValidIcon from "../../icon/icons/ValidIcon";
import { useMemo } from "react";

type IconButtonProps = Omit<ButtonProps, "label"> &
	Partial<Pick<ButtonProps, "label">> & {
		icon: IconName;
	};

const IconButton = ({ type, icon, label, onClick }: IconButtonProps) => {
	const onLocalClick = () => {
		if (onClick) {
			onClick();
		}
	};

	const IconComponent = useMemo(() => {
		const iconComponents: { [K in IconName]: React.ComponentType<any> } = {
			caret: CaretIcon,
			close: CloseIcon,
			valid: ValidIcon,
			invalid: InvalidIcon,
		};
		return iconComponents[icon];
	}, [icon]);

	return (
		<button type={type ?? "button"} className="icon-button" onClick={onLocalClick}>
			<IconComponent label={label} />
		</button>
	);
};

export default IconButton;
