import "./placementsInput.scss";

import TextInput, { type TextInputProps } from "../textInput/TextInput";
import { forwardRef, useMemo } from "react";
import { MAX_WORD_LENGTH } from "../../../utils/word";

type PlacementsInputProps = React.PropsWithRef<
	Pick<TextInputProps, "placeholder" | "value" | "onChange" | "onReset"> & {
		label?: string;
	}
>;

const PlacementsInput = forwardRef<HTMLInputElement, PlacementsInputProps>(
	({ placeholder, value, onChange, onReset, label }, ref) => {
		const addLetter = (input: string) => {
			if (input) {
				onChange(`${value}${input}`.substring(0, MAX_WORD_LENGTH));
			}
		};

		const removeLastLetter = () => {
			onChange(value.slice(0, -1));
		};

		const onLocalReset = () => {
			onChange("");
			onReset?.();
		};

		const currentLetters = useMemo(() => {
			return [...value];
		}, [value]);

		return (
			<label className="placements-input">
				<div className="label">{label ?? "Configuration du plateau"}</div>
				<div className="instruction">Saisir &quot;.&quot; pour ajouter une case vide</div>
				<TextInput
					ref={ref}
					type="letters"
					placeholder={placeholder}
					value=""
					resetable
					onChange={addLetter}
					onDelete={removeLastLetter}
					onReset={onLocalReset}
				/>
				<div className="value">
					{currentLetters.map((letter, index) => (
						<div key={index} className="letter">
							{letter === "." ? "" : letter}
						</div>
					))}
				</div>
			</label>
		);
	}
);

export default PlacementsInput;
