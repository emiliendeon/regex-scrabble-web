import "./button.scss";

export type ButtonProps = {
	className?: string;
	type?: "button" | "submit";
	label: string;
	title?: string;
	disabled?: boolean;
	onClick?: () => void;
};

const Button = ({ className, type, label, title, disabled, onClick }: ButtonProps) => {
	const onLocalClick = () => {
		if (onClick) {
			onClick();
		}
	};

	return (
		<button
			type={type ?? "button"}
			className={`button ${className ?? ""}`}
			title={title}
			disabled={disabled}
			onClick={onLocalClick}
		>
			{label}
		</button>
	);
};

export default Button;
