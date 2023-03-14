import "./button.scss";

export type ButtonProps = {
	type?: "button" | "submit";
	label: string;
	onClick?: () => void;
};

const Button = ({ type, label, onClick }: ButtonProps) => {
	return (
		<button
			type={type ?? "button"}
			className="button"
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
