import App from "./App";
import ReactDOM from "react-dom/client";
import "./assets/scss/index.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-contex";

const local = "http://192.168.1.174:4400/api/v1/";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Assert sure base URL for the API set
if (process.env.REACT_APP_URL || local) {
    localStorage.setItem("api", process.env.REACT_APP_URL || local);

    root.render(
        <AuthContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthContextProvider>
    );
} else {
    root.render(<h1>Required env variable is not set: REACT_APP_URL</h1>);
}
