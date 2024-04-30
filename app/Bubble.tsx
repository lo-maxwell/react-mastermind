import { Component, useContext, useEffect, useState } from "react";
import { HintKeyBubblesContext } from "./HintKey";
import { Board } from "./Board";
import { ColorMap } from "./GameConstants";
import { SelectedColorContext } from "./SelectedColorContext";

export const BubbleComponent = ({ color, row, col, onBubbleClick, borderColor}: { color: string , row: number, col: number, board: Board, onBubbleClick: (r: number, c: number) => any, borderColor: String}) => {

	const [bubbleColor, setBubbleColor] = useState(color);
	const {selectedColor, setSelectedColor} = useContext(SelectedColorContext);
	const {hintKeyBubbles: hintKeyBubbles, setHintKeyBubbles: setHintKeyBubbles} = useContext(HintKeyBubblesContext);

	const onBubbleComponentClick = () => {
		const [newBubbleColor, selectedColor] = onBubbleClick(row, col);
		setBubbleColor(newBubbleColor);
		setSelectedColor(selectedColor);
	};

	return (
		<button
			onClick={onBubbleComponentClick}
			className={`${ColorMap.getTailwindColor(bubbleColor)} border-2 ${borderColor} min-w-[64px] min-h-[64px] text-black font-bold ml-1 my-1 px-4 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
		>
			
		</button>
	);
};
