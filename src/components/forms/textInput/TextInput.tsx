import "./textInput.scss";

type TextInputProps = {
	value: string;
	onChange: (value: string) => void;
};

const TextInput = ({ value, onChange }: TextInputProps) => {
	return (
		<input
			className="text-input"
			type="text"
			value={value}
			onChange={(e) => {
				onChange(e.target.value);
			}}
		/>
	);
};

export default TextInput;
