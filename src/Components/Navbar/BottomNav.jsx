import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EVENTS } from '../../constants';
import eventBus from '../../utils/eventBus';

const BottomNav = () => {
	const path = useLocation();

	const handleRoute = useCallback(() => {
		if (path.pathname === '/') {
			return eventBus.dispatch(EVENTS.ADD_NEW_USER, true);
		} else {
			return eventBus.dispatch(EVENTS.ADD_NEW_TRANSACTION, true);
		}
	}, [path.pathname]);
	return (
		<div className="bottomNav">
			<Link to="/">
				<i className="fa-solid fa-house"></i>
			</Link>
			<div onClick={() => handleRoute()}>
				<i className="fa-solid fa-circle-plus"></i>
			</div>
			<Link to="/profile">
				<i className="fa-solid fa-user"></i>
			</Link>
		</div>
	);
};

export default React.memo(BottomNav);
