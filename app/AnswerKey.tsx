import { createContext, useContext, useEffect, useState } from "react";
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
		console.log(bubbles);
	}
}

//Context to allow instant updating of components. Couldn't figure out a way to pass just one row.
export const AnswerKeyBubblesContext = createContext({
	answerKeyBubbles: [[""]],
	setAnswerKeyBubbles: (s: Array<Array<string>>) => {}
});

export const AnswerKeyComponent = ({row}: {row: number}) => {
	const {answerKeyBubbles, setAnswerKeyBubbles} = useContext(AnswerKeyBubblesContext);
	return (
		<div>
			{answerKeyBubbles[row].map((value, index) => (
				<button
				key={`${index}-answerBubble`}
				className={`${ColorMap.getTailwindColor(value)} text-black font-bold ml-1 py-4 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300`}
				>
					
				</button>
			))}
		</div>
		);
}