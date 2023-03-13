import "./app.scss";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store, { persistor } from "./store";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import routes from "./navigation/routes";

const router = createBrowserRouter(routes);

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	);
};

export default App;
