import "./buttonSelect.scss";

import Button from "../button/Button";

type Option = {
	label: string;
	title?: string;
	value: string;
};

export type ButtonSelectProps = {
	options: Option[];
	value: string;
	onClick: (value: string) => void;
};

const ButtonSelect = ({ options, value, onClick }: ButtonSelectProps) => {
	return (
		<div className="button-select">
			{options.map((option) => (
				<Button
					key={option.value}
					label={option.label}
					title={option.title}
					disabled={value === option.value}
					onClick={() => {
						onClick(option.value);
					}}
				/>
			))}
		</div>
	);
};

export default ButtonSelect;
