import { BASE_URL } from '../../constants';
import './DetailsCard.css';
import cx from 'classnames';

import React, { useContext } from 'react';
import { provider } from '../../Context/ContextPovider';

const welcomeTexts = [
	'Welcome back,',
	'Welcome',
	'Hi,',
	'Hey,',
	'Hi! Nice to see you again',
	'Hi, good to see you again!',
	'Hi, there!',
	'Hello',
];

const DetailsCard = ({ userImage, userName }) => {
	const { adminPannel } = useContext(provider);
	const randomNumber = Math.floor(Math.random() * 7);

	return (
		<div className="basicCard wrapper">
			<div className="profileContainer">
				<div className="profilePic">
					{!adminPannel.admin.profile ? (
						<i className="fas fa-user-circle"></i>
					) : (
						<img
							src={`${BASE_URL}/${adminPannel.admin.profile}`}
							alt="pofile_picture"
							width="100%"
							height="100%"
						/>
					)}
				</div>

				<div className={cx('profileText', userName && 'flexClass')}>
					{!userName && (
						<span
							style={{ margin: '0 5px', textTransform: 'capitalize' }}
						>
							{welcomeTexts[randomNumber]}
						</span>
					)}
					<span>{adminPannel.admin.name.split(' ')[0]}</span>
				</div>
			</div>

			{/* {userName && <i class="fa-solid fa-arrows-up-down"></i>} */}
			{userName && (
				<div className="transferIcons">
					<i class="fa-solid fa-left-long"></i>
					<i class="fa-solid fa-right-long"></i>
				</div>
			)}

			{userName && (
				<div className="profileContainer">
					<div className="profilePic">
						{!userImage ? (
							<i className="fas fa-user-circle"></i>
						) : (
							<img
								src={`${BASE_URL}/${userImage}`}
								alt="pofile_picture"
								width="100%"
								height="100%"
							/>
						)}
					</div>

					<div className={cx('profileText', userName && 'flexClass')}>
						<span>{userName}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default DetailsCard;
