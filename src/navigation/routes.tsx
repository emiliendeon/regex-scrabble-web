import Dictionary from "../pages/dictionary/Dictionary";
import Error from "./Error";
import Placements from "../pages/placements/Placements";
import Root from "./Root";
import Word from "../pages/word/Word";

const routes = [
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Dictionary />,
			},
			{
				path: "mot/:word",
				element: <Word />,
			},
			{
				path: "placements",
				element: <Placements />,
			},
		],
	},
];

export default routes;
