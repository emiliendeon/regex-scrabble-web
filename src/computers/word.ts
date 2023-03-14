import { type Computers } from "../types/computer";

const WordComputers: Computers<string> = {
	prefix1: (word: string) => word.slice(0, 1),

	suffix1: (word: string) => word.slice(-1),

	unprefixed1Part: (word: string) => word.substring(1),

	unsuffixed1Part: (word: string) => word.slice(0, -1),
};

export default WordComputers;
