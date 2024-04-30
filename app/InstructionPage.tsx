import React, { useEffect } from 'react'

export function InstructionPage({showInstructions, setShowInstructions}: {showInstructions: boolean, setShowInstructions: Function}) {
	const handleClickOutside = (event: any) => {
		const target = event.target as HTMLElement;
		const configElement = document.querySelector('.instruction-page');
		// Check if the click occurred outside the target element
		if (configElement && !configElement.contains(target)) {
			setShowInstructions(false);
		}
	  };

	useEffect(() => {
	// Add event listener when the component mounts
	document.body.addEventListener('click', handleClickOutside);

	// Remove event listener when the component unmounts
	return () => {
		document.body.removeEventListener('click', handleClickOutside);
	};
	}, [showInstructions]); // Only re-run the effect if showInstructions changes
	//TODO: Update instructions for mastermind
	return (
		<div className={`${showInstructions ? `` : `hidden`} text-black fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 `}>
			<div className="instruction-page bg-white pt-4 p-8 rounded-lg shadow-md justify-left items-center overflow-x-auto text-left">
			<div className="text-2xl font-bold text-center pb-4">How to Play Mastermind</div>
			<div><strong>Objective:</strong> The objective of mastermind is to figure out the hidden code of colored bubbles in a limited number of guesses.</div>
			<div><strong>Board:</strong> The board consists of a number of rows of white bubbles. Over the course of the game, you will change their color to mark your guesses.</div>
			<div><strong>Gameplay:</strong></div>
			<ul className="list-disc ml-4">
				<li>Click a bubble in the color palette on the left to change your selected color.</li>
				<li>Click a bubble in the highlighted row to paint it over with your selected color.</li>
				<li>To lock in a guess, click the smaller bubbles on the right.</li>
				<li>For each color that is in the correct position, one black bubble will show up on the right.</li>
				<li>For each color that is correct but in the wrong position, one white bubble will show up on the right.</li>
			</ul>
			<div><strong>Winning:</strong> The player wins the game by correctly guessing all of the colors. When the game ends, the solution will be displayed at the bottom of the screen.</div>
			</div>
		</div>
	);
}