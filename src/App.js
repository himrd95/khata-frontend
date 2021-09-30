import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Registration from './Components/Auth/Registration';
import Navbar from './Components/Navbar/Navbar';
import { useContext } from 'react';
import { provider } from './Context/ContextPovider';

function App() {
	const { adminPannel } = useContext(provider);
	return (
		<div className='App'>
			<Navbar />
			{adminPannel.token !== '' ? <Dashboard /> : <Registration />}
		</div>
	);
}

export default App;
