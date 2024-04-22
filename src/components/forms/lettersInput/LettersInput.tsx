import "./lettersInput.scss";

import TextInput, { type TextInputProps } from "../textInput/TextInput";
import { forwardRef, useMemo } from "react";
import IconButton from "../iconButton/IconButton";
import { useForwardedRef } from "../../../utils/react";

type LettersInputProps = React.PropsWithRef<
	Pick<TextInputProps, "placeholder" | "value" | "onChange"> & {
		label?: string;
		maxLettersCount?: number;
		maxWildcardsCount?: number;
	}
>;

const LettersInput = forwardRef<HTMLInputElement, LettersInputProps>(
	({ placeholder, value, onChange, label, maxLettersCount, maxWildcardsCount }, ref) => {
		const localRef = useForwardedRef<HTMLInputElement>(ref);

		const addLetter = (input: string) => {
			const newValue = `${value}${input}`;
			const wildcardsCount = newValue.match(/\./g)?.length ?? 0;

			if (input && (!maxWildcardsCount || wildcardsCount <= maxWildcardsCount)) {
				onChange(newValue.substring(0, maxLettersCount ?? 21));
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
					resetable
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
