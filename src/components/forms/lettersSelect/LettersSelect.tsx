/* eslint-disable @typescript-eslint/ban-ts-comment */

import "./lettersSelect.scss";

import ButtonSelect, { type ButtonSelectProps } from "../buttonSelect/ButtonSelect";
import { type Letter, Letters } from "../../../types/letter";
import { useMemo } from "react";

type LettersSelectProps = Omit<ButtonSelectProps<Letter>, "options">;

const LettersSelect = ({ label, multiple, value, values, onChange }: LettersSelectProps) => {
	const options = useMemo(() => {
		return Letters.map((letter) => ({ label: letter, value: letter }));
	}, []);

	return multiple ? (
		// TypeScript Omit breaks discriminated union based on "multiple"
		// @ts-expect-error
		<ButtonSelect<Letter>
			className="letters"
			label={label}
			options={options}
			multiple
			values={values}
			onChange={onChange}
		/>
	) : (
		// @ts-expect-error
		<ButtonSelect<Letter>
			className="letters"
			label={label}
			options={options}
			value={value}
			onChange={onChange}
		/>
	);
};

export default LettersSelect;
