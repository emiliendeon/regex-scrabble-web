import "./button.scss";

import { type PropsWithClassName } from "../../../types/component";
import clsx from "clsx";

export type ButtonProps = PropsWithClassName<{
	type?: "button" | "submit";
	label: string;
	title?: string;
	selected?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}>;

const Button = ({ className, type, label, title, selected, disabled, onClick }: ButtonProps) => {
	const onLocalClick = () => {
		if (onClick && !disabled) {
			onClick();
		}
	};

	return (
		<button
			type={type ?? "button"}
			className={clsx("button", className, { selected })}
			title={title}
			disabled={disabled}
			onClick={onLocalClick}
		>
			{label}
		</button>
	);
};

export default Button;
