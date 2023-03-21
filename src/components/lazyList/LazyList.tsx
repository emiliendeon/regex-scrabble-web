import "./lazyList.scss";

import { useEffect, useMemo, useRef, useState } from "react";

type LazyListProps<T> = {
	items: T[];
	headerComponent?: React.ComponentType;
	itemRenderer: React.ComponentType<{ item: T }>;
};

const InitialDisplayedItemsCount = 100;

const LazyList = <T extends string | object>({
	items,
	headerComponent,
	itemRenderer,
}: LazyListProps<T>) => {
	const [displayedItemsCount, setDisplayedItemsCount] = useState(InitialDisplayedItemsCount);

	const lazyListRef = useRef<HTMLDivElement>(null);

	const onScroll = () => {
		if (lazyListRef.current) {
			const { offsetHeight, scrollHeight, scrollTop } = lazyListRef.current;

			if (scrollTop > scrollHeight - offsetHeight * 1.5) {
				setDisplayedItemsCount((prev) => prev + 10);
			}
		}
	};

	useEffect(() => {
		lazyListRef.current?.scrollTo(0, 0);
		setDisplayedItemsCount(InitialDisplayedItemsCount);
	}, [items]);

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
							<ItemRendererComponent item={item} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default LazyList;
