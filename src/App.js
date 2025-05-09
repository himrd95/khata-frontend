import "./App.css";
import Registration from "./Components/Auth/Registration";
import { useContext } from "react";
import { provider } from "./Context/ContextPovider";
import Home from "./Components/Home";

function App() {
    const { adminPannel } = useContext(provider);

    return (
        <div className="App">
            {adminPannel.token !== "" ? <Home /> : <Registration />}
        </div>
    );
}

export default App;
