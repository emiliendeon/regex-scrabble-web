import "./button.scss";

interface ButtonProps {
	label: string;
	onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
	return (
		<button
			type="button"
			className="button"
			onClick={() => {
				onClick();
			}}
		>
			{label}
		</button>
	);
};

export default Button;
