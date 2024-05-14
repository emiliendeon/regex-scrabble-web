import "./numberInput.scss";

import { clamp } from "../../../utils/number";

export type NumberInputProps = {
	label?: string;
	min?: number;
	max?: number;
	step?: number;
	value: number;
	onChange: (value: number) => void;
};

const NumberInput = ({ label, value, min, max, step, onChange }: NumberInputProps) => {
	const onLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(event.target.value, 10);

		if (Number.isFinite(newValue)) {
			onChange(clamp(newValue, min, max));
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
				value={value ?? min}
				onChange={onLocalChange}
			/>
		</div>
	);
};

export default NumberInput;
