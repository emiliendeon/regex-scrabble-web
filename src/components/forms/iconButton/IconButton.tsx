import "./iconButton.scss";

import ArrowIcon from "../../icon/icons/ArrowIcon";
import { type ButtonProps } from "../button/Button";
import CaretIcon from "../../icon/icons/CaretIcon";
import CloseIcon from "../../icon/icons/CloseIcon";
import { type IconName } from "../../../types/icon";
import InvalidIcon from "../../icon/icons/InvalidIcon";
import MenuIcon from "../../icon/icons/MenuIcon";
import { type Orientable } from "../../../types/component";
import ValidIcon from "../../icon/icons/ValidIcon";
import clsx from "clsx";
import { useMemo } from "react";

type IconButtonProps = Omit<ButtonProps, "label"> &
	Partial<Pick<ButtonProps, "label">> &
	(
		| Orientable<{
				icon: Extract<IconName, "arrow" | "caret">;
		  }>
		| {
				icon: Extract<IconName, "close" | "menu" | "valid" | "invalid">;
				orientation?: never;
		  }
	);

const IconButton = ({ type, icon, orientation, label, onClick }: IconButtonProps) => {
	const onLocalClick = () => {
		if (onClick) {
			onClick();
		}
	};

	const IconComponent = useMemo(() => {
		const iconComponents: { [K in IconName]: React.ComponentType<any> } = {
			arrow: ArrowIcon,
			caret: CaretIcon,
			close: CloseIcon,
			menu: MenuIcon,
			valid: ValidIcon,
			invalid: InvalidIcon,
		};
		return iconComponents[icon];
	}, [icon]);

	return (
		<button
			type={type ?? "button"}
			className={clsx("icon-button", `${icon}-icon-button`)}
			aria-label={label}
			onClick={onLocalClick}
		>
			<IconComponent label={label} orientation={orientation} />
		</button>
	);
};

export default IconButton;
