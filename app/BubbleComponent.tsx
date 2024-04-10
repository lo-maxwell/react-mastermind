import { Component, useEffect, useState } from "react";

export const BubbleComponent = ({ color, row, col, onBubbleClick }: { color: string , row: number, col: number, onBubbleClick: (r: number, c: number, s: string) => any}) => {

	const [bubbleColor, setBubbleColor] = useState(color);

	const onBubbleComponentClick = () => {
		const newColor = onBubbleClick(row, col, color);
		setBubbleColor(newColor);
		// const newColor = "bg-blue-300";
		// setBubbleColor(newColor);
		// Problem: We need to do 2 different things depending on if the bubble is locked or not. 
		// We also don't know the row/col of the bubble clicking to pass back to the grid utility.
		// However, some other functions may not care if the bubble is locked.
		// Options: 
		// 1) Store a unique ID for each bubble, and have the locked status stored in gameUtility
		// 2) Pass the locked status into onBubbleClick
		// 3) 

	};

	return (
		<button
			onClick={onBubbleComponentClick}
			className={`${bubbleColor} text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300`}
		>
			{bubbleColor}
		</button>
	);
};
