import "./lazyList.scss";

import { useEffect, useMemo, useRef, useState } from "react";

import { type PropsWithClassName } from "../../types/component";
import clsx from "clsx";

type LazyListProps<T> = PropsWithClassName<{
	items: T[];
	headerComponent?: React.ComponentType;
	itemRenderer: React.ComponentType<{ item: T }>;
	currentIndex?: number;
}>;

const INITIAL_DISPLAYED_ITEMS_COUNT = 100;

const LazyList = <T extends string | object>({
	className,
	items,
	headerComponent,
	itemRenderer,
	currentIndex,
}: LazyListProps<T>) => {
	const [displayedItemsCount, setDisplayedItemsCount] = useState(
		INITIAL_DISPLAYED_ITEMS_COUNT + (currentIndex ?? 0)
	);

	const headerRef = useRef<HTMLElement>(null);
	const lazyListRef = useRef<HTMLDivElement>(null);

	const displayedItems = useMemo(() => {
		return items.slice(0, displayedItemsCount);
	}, [items, displayedItemsCount]);

	useEffect(() => {
		lazyListRef.current?.scrollTo(0, 0);
		setDisplayedItemsCount(INITIAL_DISPLAYED_ITEMS_COUNT);
	}, [items]);

	useEffect(() => {
		if (currentIndex !== undefined && lazyListRef.current) {
			const headerHeight = headerRef.current?.scrollHeight ?? 0;

			const lazyListStyle = window.getComputedStyle(lazyListRef.current);

			const contentHeight =
				lazyListRef.current?.scrollHeight -
				headerHeight -
				parseInt(lazyListStyle.paddingBottom, 10);

			const itemHeight = contentHeight / displayedItems.length;

			const currentItemPosition = headerHeight + currentIndex * itemHeight;

			lazyListRef.current?.scrollTo(0, currentItemPosition);
		}
	}, [displayedItems.length, currentIndex, headerRef.current, lazyListRef.current]);

	const onScroll = () => {
		if (lazyListRef.current) {
			const { offsetHeight, scrollHeight, scrollTop } = lazyListRef.current;

			if (scrollTop > scrollHeight - offsetHeight * 1.5) {
				setDisplayedItemsCount((prev) => prev + 10);
			}
		}
	};

	const HeaderComponent = headerComponent;
	const ItemRendererComponent = itemRenderer;

	return (
		<div className={clsx("lazy-list", className)} ref={lazyListRef} onScroll={onScroll}>
			{HeaderComponent && (
				<header ref={headerRef}>
					<HeaderComponent />
				</header>
			)}
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
