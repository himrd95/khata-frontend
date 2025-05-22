import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SEO from "./Components/SEO";
import Routes from "./Routes";
import { Provider } from "./Context/ContextPovider";

const App = () => {
    return (
        <Provider>
            <Router>
                <SEO />
                <Routes />
            </Router>
        </Provider>
    );
};

export default App;
