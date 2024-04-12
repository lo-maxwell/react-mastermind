import { ColorMap } from "./GameConstants";

//Don't need to have information of the other answerkeys, so we can have each row have a unique answerkey
export class AnswerKey {

}

export const AnswerKeyComponent = ({answers}: {answers: Array<string>}) => {
	return (
		<div>
			{answers.map((value, index) => (
				<button
				className={`${ColorMap.getTailwindColor(value)} text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-300`}
				>
					{value}
				</button>
			))}
		</div>
		);
}