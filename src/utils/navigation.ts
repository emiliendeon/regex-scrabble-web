import { useLocation, useSearchParams } from "react-router-dom";

import { useMemo } from "react";

export const useReferer = () => {
	const [searchParams] = useSearchParams();

	return searchParams.get("referer");
};

export const useHashWord = () => {
	const { hash } = useLocation();

	const hashWord = useMemo(() => {
		return hash?.match(/^#mot-(?<word>[a-z]+)$/)?.groups?.word;
	}, [hash]);

	return hashWord;
};
