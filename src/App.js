import "./App.css";
import Registration from "./Components/Auth/Registration";
import { useContext, useEffect } from "react";
import { provider } from "./Context/ContextPovider";
import Home from "./Components/Home";

function App() {
    const { adminPannel, currentUser } = useContext(provider);

    // Global scroll reset handler
    useEffect(() => {
        // Reset scroll position on currentUser change (view change)
        window.scrollTo(0, 0);

        // Also add a listener for navigation events (route changes)
        const handleNavigation = () => {
            window.scrollTo(0, 0);
        };

        // Add event listeners
        window.addEventListener("popstate", handleNavigation);

        // Cleanup
        return () => {
            window.removeEventListener("popstate", handleNavigation);
        };
    }, [currentUser]);

    return (
        <div className="App">
            {adminPannel.token !== "" ? <Home /> : <Registration />}
        </div>
    );
}

export default App;
