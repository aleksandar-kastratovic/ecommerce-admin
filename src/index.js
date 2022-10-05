import App from "./App";
import ReactDOM from "react-dom";
import "./assets/scss/index.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-contex";

const local = "http://192.168.1.174:4400/api/v1/";
const staging = "https://api.reflekta.croonus.com/api/v1/";

// Assert sure base URL for the API set
if (process.env.REACT_APP_URL || staging) {
    localStorage.setItem("api", process.env.REACT_APP_URL || staging);

    ReactDOM.render(
        <AuthContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthContextProvider>,
        document.getElementById("root")
    );
} else {
    ReactDOM.render(<h1>Required env variable is not set: REACT_APP_URL</h1>, document.getElementById("root"));
}
