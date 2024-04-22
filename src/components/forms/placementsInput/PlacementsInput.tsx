import "./placementsInput.scss";

import TextInput, { type TextInputProps } from "../textInput/TextInput";
import { forwardRef, useMemo } from "react";

type PlacementsInputProps = React.PropsWithRef<
	Pick<TextInputProps, "placeholder" | "value" | "onChange"> & {
		label?: string;
	}
>;

const PlacementsInput = forwardRef<HTMLInputElement, PlacementsInputProps>(
	({ placeholder, value, onChange, label }, ref) => {
		const addLetter = (input: string) => {
			if (input) {
				onChange(`${value}${input}`.substring(0, 21));
			}
		};

		const removeLastLetter = () => {
			onChange(value.slice(0, -1));
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
					onReset={() => {
						onChange("");
					}}
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
