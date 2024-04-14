import { createContext, useContext, useEffect, useState } from "react";
import { Board } from "./Board";
import { ColorMap } from "./GameConstants";

//Don't need to have information of the other answerkeys, so we can have each row have a unique answerkey
export class AnswerKey {
	bubbles: Array<string>;
	constructor(size: number) {
		this.bubbles = AnswerKey.generateGrayBubbles(size);
	}

	static generateGrayBubbles(size: number) {
		return Array(size).fill("gray");
	}

	setBubbles(bubbles: Array<string>) {
		this.bubbles = bubbles;
	}
}

//Context to allow instant updating of components. Couldn't figure out a way to pass just one row.
export const AnswerKeyBubblesContext = createContext({
	answerKeyBubbles: [[""]],
	setAnswerKeyBubbles: (s: Array<Array<string>>) => {}
});

export const AnswerKeyComponent = ({row, board}: {row: number, board: Board}) => {
	const {answerKeyBubbles, setAnswerKeyBubbles} = useContext(AnswerKeyBubblesContext);

	const handleSubmit = () => {
		if (board.activeRow == row) {
			console.log("Clicked!");
			setAnswerKeyBubbles(board.getAnswerGridBubbles());
			board.lockRow(board.activeRow);
			board.setActiveRow(board.activeRow + 1);
		}
	};

	const isEven = board.numCols % 2 == 0;
	const answerBubbles = answerKeyBubbles[row];
	const group1 = answerBubbles.slice(0, Math.ceil(answerBubbles.length / 2));
	const group2 = answerKeyBubbles[row].slice(Math.ceil(answerBubbles.length / 2));

	return (
		<div className={`flex flex-wrap flex-row`}>
			<div className={`flex flex-row w-full mt-1`}>
				{group1.map((value, index) => (
					<button
					onClick={handleSubmit}
					key={`${index}-answerBubble`}
					className={`${ColorMap.getTailwindColor(value)} w-[30px] h-[30px] text-black font-bold ml-1 py-1 px-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300`}
					>
					</button>
				))}
			</div>
			<div className={`flex flex-row w-full my-1`}>
			{group2.map((value, index) => (
				<button
				onClick={handleSubmit}
				key={`${index}-answerBubble`}
				className={`${ColorMap.getTailwindColor(value)} w-[30px] h-[30px] text-black font-bold ml-1 py-1 px-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300`}
				>
				</button>
			))}
			</div>
		</div>
		);	
}