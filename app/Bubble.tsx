import {ColorMap} from "GameConstants";
import { Component, useState } from "react";

export const BubbleComponent = ({ color }: { color: string }) => {
	const [bubbleColor, setBubbleColor] = useState(color);

	const onBubbleClick = () => {
		const newColor = "bg-blue-300";
		setBubbleColor(newColor);
	};

	return (
		<button
			onClick={onBubbleClick}
			className={`${bubbleColor} text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300`}
		>
			{bubbleColor}
		</button>
	);
};
