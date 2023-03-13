import Dictionary from "../pages/dictionary/Dictionary";
import Error from "./Error";
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
				path: "error",
				element: <Error />,
			},
		],
	},
];

export default routes;
