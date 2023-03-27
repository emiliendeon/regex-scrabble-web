import "./textInput.scss";

import { type FormatType, formatInput } from "../../../utils/string";
import IconButton from "../iconButton/IconButton";
import { forwardRef } from "react";

export type TextInputProps = React.PropsWithRef<{
	type?: FormatType;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	onDelete?: () => void;
	onReset?: () => void;
}>;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({ type, placeholder, value, onChange, onDelete, onReset }, ref) => {
		const onLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = type ? formatInput[type](event.target.value) : event.target.value;
			onChange(newValue);
		};

		const onLocalKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (onDelete && event.key === "Backspace") {
				onDelete();
			}
		};

		const onLocalReset = () => {
			onChange("");

			if (onReset) {
				onReset();
			}
		};

		return (
			<div className="text-input">
				<input
					ref={ref}
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={onLocalChange}
					onKeyUp={onLocalKeyUp}
				/>
				{onReset && (
					<IconButton icon="close" label="Réinitialiser" onClick={onLocalReset} />
				)}
			</div>
		);
	}
);

export default TextInput;
