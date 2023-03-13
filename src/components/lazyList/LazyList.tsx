import "./lazyList.scss";

import { useMemo, useRef, useState } from "react";

type Item = string;

interface LazyListProps {
	items: Item[];
	itemRenderer?: React.ComponentType<{ item: Item }>;
}

const LazyList = ({ items, itemRenderer }: LazyListProps) => {
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

	const ItemRendererComponent = itemRenderer;

	return (
		<ul className="lazy-list" ref={lazyListRef} onScroll={onScroll}>
			{displayedItems.map((item, index) => {
				return (
					<li key={index}>
						{ItemRendererComponent ? <ItemRendererComponent item={item} /> : item}
					</li>
				);
			})}
		</ul>
	);
};

export default LazyList;
