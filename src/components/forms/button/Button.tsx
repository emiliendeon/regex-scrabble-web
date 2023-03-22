import "./button.scss";

export type ButtonProps = {
	type?: "button" | "submit";
	label: string;
	title?: string;
	disabled?: boolean;
	onClick?: () => void;
};

const Button = ({ type, label, title, disabled, onClick }: ButtonProps) => {
	return (
		<button
			type={type ?? "button"}
			className="button"
			title={title}
			disabled={disabled}
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
		>
			{label}
		</button>
	);
};

export default Button;
