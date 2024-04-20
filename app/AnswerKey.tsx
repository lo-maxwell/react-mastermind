import { createContext, useContext, useState } from "react";
import { ColorMap } from "./GameConstants";

export const AnswerKeyContext = createContext({
	showAnswerKey: false,
	setShowAnswerKey: (value: boolean) => {}
});

export const AnswerKeyComponent = ({bubbles} : {bubbles: Array<string>}) => {
	const {showAnswerKey, setShowAnswerKey} = useContext(AnswerKeyContext);
	return (
		<div>
			{bubbles.map((value, index) => (
				<button
				key={`${index}-answerBubble`}
				className={`${showAnswerKey ? ColorMap.getTailwindColor(value) : ColorMap.getTailwindColor(`white`)} min-w-[64px] min-h-[64px] text-black font-bold ml-1 py-1 px-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300`}
				></button>
			))}
		</div>
		);
}