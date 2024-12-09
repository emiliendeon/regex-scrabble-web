import "./textInput.scss";

import { type FormatType, formatInput } from "../../../utils/string";
import IconButton from "../iconButton/IconButton";
import clsx from "clsx";
import { forwardRef } from "react";

export type TextInputProps = React.PropsWithRef<
	{
		type?: FormatType;
		placeholder?: string;
		disabled?: boolean;
		value: string;
		onChange: (value: string) => void;
		onDelete?: () => void;
	} & (
		| {
				resetable: true;
				onReset?: () => void;
		  }
		| {
				resetable?: false;
				onReset?: never;
		  }
	)
>;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({ type, placeholder, disabled, value, resetable, onChange, onDelete, onReset }, ref) => {
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
			<div className={clsx("text-input", { resetable })}>
				<input
					ref={ref}
					type="text"
					placeholder={placeholder}
					disabled={disabled}
					value={value}
					onChange={onLocalChange}
					onKeyUp={onLocalKeyUp}
				/>
				{resetable && (
					<IconButton
						icon="close"
						label="Réinitialiser"
						disabled={disabled}
						onClick={onLocalReset}
					/>
				)}
			</div>
		);
	}
);

export default TextInput;
