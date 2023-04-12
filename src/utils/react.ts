import { useEffect, useRef } from "react";

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
