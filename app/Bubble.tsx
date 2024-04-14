import { Component, useContext, useEffect, useState } from "react";
import { AnswerKeyBubblesContext } from "./AnswerKey";
import { Board } from "./Board";
import { ColorMap } from "./GameConstants";
import { SelectedColorContext } from "./SelectedColorContext";

export const BubbleComponent = ({ color, row, col, board, onBubbleClick}: { color: string , row: number, col: number, board: Board, onBubbleClick: (r: number, c: number) => any}) => {

	const [bubbleColor, setBubbleColor] = useState(color);
	const {selectedColor, setSelectedColor} = useContext(SelectedColorContext);
	const {answerKeyBubbles, setAnswerKeyBubbles} = useContext(AnswerKeyBubblesContext);

	const onBubbleComponentClick = () => {
		const [newBubbleColor, selectedColor] = onBubbleClick(row, col);
		setBubbleColor(newBubbleColor);
		setSelectedColor(selectedColor);
		console.log("Set color to: ", newBubbleColor);
		// const newAnswerKeyBubbles = board.getAnswerGridBubbles();

		setAnswerKeyBubbles(board.getAnswerGridBubbles());
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
