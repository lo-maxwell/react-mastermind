import { createContext, useContext, useState } from 'react';

export const SelectedColorContext = createContext({
	selectedColor: "white",
	setSelectedColor: (s: string) => {}
});
