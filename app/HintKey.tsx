import { createContext, useContext, useEffect, useState } from "react";
import { AnswerKeyContext } from "./AnswerKey";
import { Board } from "./Board";
import { ColorMap } from "./GameConstants";

//Don't need to have information of the other answerkeys, so we can have each row have a unique answerkey
export class HintKey {
	bubbles: Array<string>;
	constructor(size: number) {
		this.bubbles = HintKey.generateGrayBubbles(size);
	}

	static generateGrayBubbles(size: number) {
		return Array(size).fill("gray");
	}

	setBubbles(bubbles: Array<string>) {
		this.bubbles = bubbles;
	}
}

//Context to allow instant rerendering of components. Couldn't figure out a way to pass just one row.
export const HintKeyBubblesContext = createContext({
	hintKeyBubbles: [[""]],
	setHintKeyBubbles: (s: Array<Array<string>>) => {}
});

export const HintKeyComponent = ({row, board}: {row: number, board: Board}) => {
	const {hintKeyBubbles, setHintKeyBubbles: setHintKeyBubbles} = useContext(HintKeyBubblesContext);
	const {showAnswerKey, setShowAnswerKey} = useContext(AnswerKeyContext);
	const handleSubmit = () => {
		if (board.activeRow == row) {
			console.log("Clicked!");
			setHintKeyBubbles(board.getHintGridBubbles());
			board.lockRow(board.activeRow);
			
			if (board.checkWinCondition()) {
				//Show answer and disable gameplay
				setShowAnswerKey(true);
				board.setActiveRow(-1);
			} else {
				//Move active row down
				board.setActiveRow(board.activeRow + 1);
			}
		}
	};

	const isEven = board.numCols % 2 == 0;
	const hintBubbles = hintKeyBubbles[row];
	const group1 = hintBubbles.slice(0, Math.ceil(hintBubbles.length / 2));
	const group2 = hintKeyBubbles[row].slice(Math.ceil(hintBubbles.length / 2));

	return (
		<div className={`flex flex-wrap flex-row`}>
			<div className={`flex flex-row w-full mt-1`}>
				{group1.map((value, index) => (
					<button
					onClick={handleSubmit}
					key={`${index}-hintBubble`}
					className={`${ColorMap.getTailwindColor(value)} w-[30px] h-[30px] text-black font-bold ml-1 py-1 px-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300`}
					>
					</button>
				))}
			</div>
			<div className={`flex flex-row w-full my-1`}>
			{group2.map((value, index) => (
				<button
				onClick={handleSubmit}
				key={`${index}-hintBubble`}
				className={`${ColorMap.getTailwindColor(value)} w-[30px] h-[30px] text-black font-bold ml-1 py-1 px-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300`}
				>
				</button>
			))}
			</div>
		</div>
		);	
}