import React, {
    Suspense,
    lazy,
    useContext,
    useEffect,
    useCallback,
} from "react";
import { provider } from "./Context/ContextPovider";
import "./App.css";
import Routing from "./Route/Routes";

// Lazy load components
const Home = lazy(() => import("./Components/Home"));
const Registration = lazy(() => import("./Components/Auth/Registration"));

// Loading fallback component
const LoadingFallback = () => (
    <div className="hero-section">
        <h1 className="hero-title">Tired of managing your daily expenses?</h1>
    </div>
);

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
            <Suspense fallback={<LoadingFallback />}>
                <Routing />
            </Suspense>
        </div>
    );
}

export default App;
