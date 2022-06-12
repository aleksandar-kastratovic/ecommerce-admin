import "./assets/scss/custom.scss";
import ReactDOM                from "react-dom";
import App                     from "./App";
import { BrowserRouter }       from "react-router-dom";
import { AuthContextProvider } from "./store/auth-contex";

// Assert sure base URL for the API set
if (process.env.REACT_APP_URL) {
	localStorage.setItem("api", (process.env.REACT_APP_URL));

	ReactDOM.render(
		<AuthContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthContextProvider>,
		document.getElementById("root")
	);

} else {
	ReactDOM.render(
		<h1>Required env variable is not set: REACT_APP_URL</h1>,
		document.getElementById("root")
	);
}
