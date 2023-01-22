import React from 'react';
import {
	Link,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';
import { EVENTS } from '../../constants';
import eventBus from '../../utils/eventBus';

const BottomNav = () => {
	const path = useLocation();

	const handleRoute = () => {
		if (path.pathname === '/') {
			eventBus.dispatch(EVENTS.ADD_NEW_USER, true);
		} else {
			eventBus.dispatch(EVENTS.ADD_NEW_TRANSACTION, true);
		}
	};
	return (
		<div className="bottomNav">
			<Link to="/">
				<i className="fa-solid fa-house"></i>
			</Link>
			<div onClick={() => handleRoute()}>
				<i className="fa-solid fa-circle-plus"></i>
			</div>
			<Link to="profile">
				<i className="fa-solid fa-user"></i>
			</Link>
		</div>
	);
};

export default BottomNav;
