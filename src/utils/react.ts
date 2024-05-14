import { useEffect, useMemo, useRef, useState } from "react";

export const useForwardedRef = <T>(forwardedRef: React.ForwardedRef<T>) => {
	const localRef = useRef<T>(null);

	useEffect(() => {
		if (forwardedRef) {
			if (typeof forwardedRef === "function") {
				forwardedRef(localRef.current);
			} else {
				forwardedRef.current = localRef.current;
			}
		}
	}, [forwardedRef]);

	return localRef;
};

export const useDebounce = (
	deps: Array<number | string | object | number[] | string[] | object[]>
) => {
	const [isDebounced, setDebounced] = useState(false);

	const depsStringified = useMemo(() => {
		return JSON.stringify(deps);
	}, [deps]);

	useEffect(() => {
		setDebounced(false);
	}, [depsStringified]);

	return [isDebounced, setDebounced] as const;
};
