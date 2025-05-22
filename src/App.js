import "./App.css";
import Registration from "./Components/Auth/Registration";
import { useContext, useEffect, useCallback } from "react";
import { provider } from "./Context/ContextPovider";
import Home from "./Components/Home";

function App() {
    const { adminPannel, currentUser } = useContext(provider);

    // Memoize the scroll handler
    const handleScroll = useCallback(() => {
        window.scrollTo(0, 0);
    }, []);

    // Global scroll reset handler
    useEffect(() => {
        // Reset scroll position on currentUser change (view change)
        handleScroll();

        // Add event listener for navigation events
        window.addEventListener("popstate", handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener("popstate", handleScroll);
        };
    }, [currentUser, handleScroll]);

    return (
        <div className="App">
            {adminPannel.token !== "" ? <Home /> : <Registration />}
        </div>
    );
}

export default App;
