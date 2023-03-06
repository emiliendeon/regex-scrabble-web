import "./app.css";

import store, { persistor } from "./store";

import Dictionary from "./pages/dictionary/Dictionary";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Dictionary />
			</PersistGate>
		</Provider>
	);
};

export default App;
