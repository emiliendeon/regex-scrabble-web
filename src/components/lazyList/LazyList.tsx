import "./lazyList.scss";

import { useMemo, useRef, useState } from "react";

type Item = string;

type LazyListProps = {
	items: Item[];
	headerComponent?: React.ComponentType;
	itemRenderer?: React.ComponentType<{ item: Item }>;
};

const LazyList = ({ items, headerComponent, itemRenderer }: LazyListProps) => {
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

	const HeaderComponent = headerComponent;
	const ItemRendererComponent = itemRenderer;

	return (
		<div className="lazy-list" ref={lazyListRef} onScroll={onScroll}>
			{HeaderComponent && <HeaderComponent />}
			<ul>
				{displayedItems.map((item, index) => {
					return (
						<li key={index}>
							{ItemRendererComponent ? <ItemRendererComponent item={item} /> : item}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default LazyList;
