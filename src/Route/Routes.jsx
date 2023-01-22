import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import Profile from '../Components/Profile/Profile';
import UserTransactions from '../Components/UserTransactions/UserTransactions';

const Routing = () => {
	return (
		<Routes>
			<Route exact path="/" element={<Dashboard />} />
			<Route exact path="/:id" element={<UserTransactions />} />
			<Route exact path="/profile" element={<Profile />} />
		</Routes>
	);
};

export default Routing;
