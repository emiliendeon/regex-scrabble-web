import "./lettersInput.scss";

import TextInput, { type TextInputProps } from "../textInput/TextInput";
import { forwardRef, useMemo } from "react";
import IconButton from "../iconButton/IconButton";
import { useForwardedRef } from "../../../utils/react";

type LettersInputProps = React.PropsWithRef<
	Pick<TextInputProps, "placeholder" | "value" | "onChange"> & {
		label?: string;
		maxLettersCount?: number;
	}
>;

const LettersInput = forwardRef<HTMLInputElement, LettersInputProps>(
	({ placeholder, value, onChange, label, maxLettersCount }, ref) => {
		const localRef = useForwardedRef<HTMLInputElement>(ref);

		const addLetter = (input: string) => {
			if (input) {
				onChange(`${value}${input}`.substring(0, maxLettersCount ?? 21));
			}
		};

		const removeLetter = (letter: string) => {
			const replaceRegex = new RegExp(letter === "." ? "\\." : letter);
			onChange(value.replace(replaceRegex, ""));
			localRef.current?.focus();
		};

		const removeLastLetter = () => {
			onChange(value.slice(0, -1));
		};

		const currentLetters = useMemo(() => {
			return [...value];
		}, [value]);

		return (
			<label className="letters-input">
				{label && <div className="label">{label}</div>}
				<div className="instruction">Saisir &quot;.&quot; pour ajouter un joker</div>
				<TextInput
					ref={localRef}
					type="letters"
					placeholder={placeholder}
					value=""
					onChange={addLetter}
					onDelete={removeLastLetter}
					onReset={() => {
						onChange("");
					}}
				/>
				<div className="value">
					{currentLetters.map((letter, index) => (
						<div key={index} className="letter">
							<div className="content">{letter}</div>
							<IconButton
								icon="close"
								label="Retirer cette lettre"
								onClick={() => {
									removeLetter(letter);
								}}
							/>
						</div>
					))}
				</div>
			</label>
		);
	}
);

export default LettersInput;
