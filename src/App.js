import "./App.css";
import Registration from "./Components/Auth/Registration";
import Navbar from "./Components/Navbar/Navbar";
import { useContext } from "react";
import { provider } from "./Context/ContextPovider";
import Routing from "./Route/Routes";

function App() {
    const { adminPannel } = useContext(provider);
    return (
        <div className="App">
            <Navbar />
            {adminPannel.token !== "" ? <Routing /> : <Registration />}
        </div>
    );
}

export default App;
