import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/App.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CookiesProvider } from "react-cookie";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    //     <ErrorBoundary>
    //         <App />
    //     </ErrorBoundary>
    // </React.StrictMode>

    <CookiesProvider>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
