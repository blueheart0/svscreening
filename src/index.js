import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import {BoundBox, Polygons, VideoViewer} from "views";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index path={"/"} element={<App/>}/>
                <Route path={"/BoundBox"} element={<BoundBox/>}/>
                <Route path={"/Polygons"} element={<Polygons/>}/>
                <Route path={"/VideoViewer"} element={<VideoViewer/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
