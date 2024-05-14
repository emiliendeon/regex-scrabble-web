import "./buttonSelect.scss";

import Button from "../button/Button";
import { type PropsWithClassName } from "../../../types/component";
import clsx from "clsx";
import { useCallback } from "react";

type Option<T extends string> = {
	label: string;
	title?: string;
	value: T;
};

export type ButtonSelectProps<T extends string> = PropsWithClassName<
	{
		label?: string;
		options: Array<Option<T>>;
	} & (
		| {
				multiple: true;
				value?: never;
				values: T[];
				onChange: (values: T[]) => void;
		  }
		| {
				multiple?: false;
				value: T;
				values?: never;
				onChange: (value: T) => void;
		  }
	)
>;

const ButtonSelect = <T extends string = string>({
	className,
	label,
	options,
	multiple,
	value,
	values,
	onChange,
}: ButtonSelectProps<T>) => {
	const isOptionSelected = useCallback(
		(option: Option<T>) => {
			if (multiple) {
				return values.includes(option.value);
			}
			return value === option.value;
		},
		[multiple, value, values]
	);

	const onLocalChange = (option: Option<T>) => {
		if (multiple) {
			if (isOptionSelected(option)) {
				onChange(values.filter((value) => value !== option.value));
			} else {
				onChange([...values, option.value]);
			}
		} else {
			onChange(option.value);
		}
	};

	return (
		<div className={clsx("button-select", className)}>
			{label && <div className="label">{label}</div>}
			<div className="options">
				{options.map((option) => {
					const selected = isOptionSelected(option);

					return (
						<Button
							key={option.value}
							label={option.label}
							title={option.title}
							selected={selected}
							disabled={selected && !multiple}
							onClick={() => {
								onLocalChange(option);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ButtonSelect;
