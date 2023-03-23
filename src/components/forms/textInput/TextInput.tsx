import "./textInput.scss";

import { type FormatType, formatInput } from "../../../utils/string";

import { forwardRef } from "react";

type TextInputProps = React.PropsWithRef<{
	type?: FormatType;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
}>;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({ type, placeholder, value, onChange }, ref) => {
		const onLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = type ? formatInput[type](event.target.value) : event.target.value;
			onChange(newValue);
		};

		return (
			<input
				ref={ref}
				className="text-input"
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={onLocalChange}
			/>
		);
	}
);

export default TextInput;
