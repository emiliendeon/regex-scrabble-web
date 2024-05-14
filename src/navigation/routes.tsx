import Dictionary from "../pages/dictionary/Dictionary";
import Error from "./Error";
import Lists from "../pages/lists/Lists";
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
				path: "listes",
				element: <Lists />,
			},
			{
				path: "placements",
				element: <Placements />,
			},
			{
				path: "mot/:word",
				element: <Word />,
			},
		],
	},
];

export default routes;
