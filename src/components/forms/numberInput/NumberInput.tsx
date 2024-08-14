import "./numberInput.scss";

import { useEffect, useState } from "react";

import { isNumberInRange } from "../../../utils/number";

export type NumberInputProps = {
	label?: string;
	min?: number;
	max?: number;
	step?: number;
	value: number;
	onChange: (value: number) => void;
};

const NumberInput = ({ label, value, min, max, step, onChange }: NumberInputProps) => {
	const [localValue, setLocalValue] = useState<NumberInputProps["value"] | "">(value);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const onLocalFocus = () => {
		setLocalValue("");
	};

	const onLocalBlur = () => {
		setLocalValue(value);
	};

	const onLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(event.target.value, 10);

		if (!Number.isFinite(newValue)) {
			return;
		}

		if (isNumberInRange([min, max], newValue)) {
			onChange(newValue);
		} else {
			setLocalValue(newValue);
		}
	};

	return (
		<div className="number-input">
			{label && <div className="label">{label}</div>}
			<input
				type="number"
				min={min}
				max={max}
				step={step ?? 1}
				value={localValue}
				onFocus={onLocalFocus}
				onBlur={onLocalBlur}
				onChange={onLocalChange}
			/>
		</div>
	);
};

export default NumberInput;
