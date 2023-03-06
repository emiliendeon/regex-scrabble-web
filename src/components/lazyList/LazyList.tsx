import "./lazyList.scss";

import { useMemo, useRef, useState } from "react";

interface LazyListProps {
	items: string[];
}

const LazyList = ({ items }: LazyListProps) => {
	const [displayedItemsCount, setDisplayedItemsCount] = useState(100);

	const lazyListRef = useRef(null);

	const onScroll = () => {
		if (lazyListRef.current) {
			const { offsetHeight, scrollHeight, scrollTop } = lazyListRef.current;

			if (scrollTop > scrollHeight - offsetHeight * 1.5) {
				setDisplayedItemsCount((prev) => prev + 10);
			}
		}
	};

	const displayedItems = useMemo(() => {
		return items.slice(0, displayedItemsCount);
	}, [items, displayedItemsCount]);

	return (
		<ul className="lazy-list" ref={lazyListRef} onScroll={onScroll}>
			{displayedItems.map((item, index) => (
				<li key={index}>{item}</li>
			))}
		</ul>
	);
};

export default LazyList;
