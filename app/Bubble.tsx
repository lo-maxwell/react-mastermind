import { Component, useEffect, useState } from "react";
import { ColorMap } from "./GameConstants";

export const BubbleComponent = ({ color, row, col, onBubbleClick }: { color: string , row: number, col: number, onBubbleClick: (r: number, c: number) => any}) => {

	const [bubbleColor, setBubbleColor] = useState(color);

	const onBubbleComponentClick = () => {
		const newColor = onBubbleClick(row, col);
		setBubbleColor(newColor);
	};

	return (
		<button
			onClick={onBubbleComponentClick}
			className={`${ColorMap.getTailwindColor(bubbleColor)} text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300`}
		>
			{bubbleColor}
		</button>
	);
};
