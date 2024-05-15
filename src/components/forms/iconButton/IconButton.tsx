import "./iconButton.scss";

import {
	type IconName,
	type NonOrientableIconName,
	type OrientableIconName,
} from "../../../types/icon";
import ArrowIcon from "../../icon/icons/ArrowIcon";
import { type ButtonProps } from "../button/Button";
import CaretIcon from "../../icon/icons/CaretIcon";
import CloseIcon from "../../icon/icons/CloseIcon";
import InvalidIcon from "../../icon/icons/InvalidIcon";
import MenuIcon from "../../icon/icons/MenuIcon";
import { type Orientable } from "../../../types/component";
import ValidIcon from "../../icon/icons/ValidIcon";
import clsx from "clsx";
import { computeIconLabel } from "../../../utils/icon";
import { useMemo } from "react";

type IconButtonProps = Omit<ButtonProps, "label"> &
	Partial<Pick<ButtonProps, "label">> &
	(
		| Orientable<{
				icon: OrientableIconName;
		  }>
		| {
				icon: NonOrientableIconName;
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

	const labelComputed = useMemo(() => {
		return label ?? computeIconLabel(icon, orientation);
	}, [icon, label, orientation]);

	return (
		<button
			type={type ?? "button"}
			className={clsx("icon-button", `${icon}-icon-button`)}
			title={labelComputed}
			aria-label={labelComputed}
			onClick={onLocalClick}
		>
			<IconComponent label={labelComputed} orientation={orientation} />
		</button>
	);
};

export default IconButton;
