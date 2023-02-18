import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import NotFoundPage from '../Components/NotFoundPage/NotFoundPage';
import Profile from '../Components/Profile/Profile';
import UserTransactions from '../Components/UserTransactions/UserTransactions';

const Routing = () => {
	return (
		<Routes>
			<Route exact path="/" element={<Dashboard />} />
			<Route exact path="/:id" element={<UserTransactions />} />
			<Route exact path="/profile" element={<Profile />} />
			<Route exact path="/error404" element={<NotFoundPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default Routing;
