import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/shared/header/Header";

function App() {
    return (
        <BrowserRouter>
            <div className="appWrapper">
                <Header/>
            </div>
        </BrowserRouter>
    );
}

export default App;
