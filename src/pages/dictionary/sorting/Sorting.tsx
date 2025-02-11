import "./sorting.scss";

import { DictionaryActions, type DictionaryStore } from "../../../reducers/dictionary";
import { SortingOptions, formatSortingValue } from "../../../utils/dictionary";
import { useDispatch, useSelector } from "../../../store";

import ButtonSelect from "../../../components/forms/buttonSelect/ButtonSelect";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type SortingProps = {
	disabled?: boolean;
};

const Sorting = ({ disabled }: SortingProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const sorting = useSelector((state) => state.dictionary.sorting);

	const setSorting = (value: string) => {
		if (disabled) {
			return;
		}

		navigate("/");

		const [criterion, mode] = value.split("_");
		dispatch(DictionaryActions.setSorting({ criterion, mode } as DictionaryStore["sorting"]));
	};

	const sortingValue = useMemo(() => {
		return formatSortingValue(sorting);
	}, [sorting]);

	return (
		<div id="sorting">
			<ButtonSelect
				options={SortingOptions.map((sortingOption) => ({
					label: sortingOption.label,
					title: sortingOption.title,
					value: formatSortingValue(sortingOption),
				}))}
				disabled={disabled}
				value={sortingValue}
				onChange={setSorting}
			/>
		</div>
	);
};

export default Sorting;
