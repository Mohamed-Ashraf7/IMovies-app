import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <MovieProvider>
     <React.StrictMode>
       <BrowserRouter>
         <App />
       </BrowserRouter>
     </React.StrictMode>
    </MovieProvider>
);

