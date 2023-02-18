import React from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from '../Button/Button';
import './NotFoundPage.css';

const NotFoundPage = () => {
	return (
		<div className="container404">
			<section class="page_404">
				<div class="container">
					<div class="row row404">
						<div class="col-sm-12 ">
							<div class="col-sm-10 col-sm-offset-1  text-center">
								<div class="four_zero_four_bg">
									<h1 class="text-center ">404</h1>
								</div>

								<div class="contant_box_404">
									<h3 class="h2">Look like you're lost</h3>

									<p>the page you are looking for not avaible!</p>

									<Link to="/">
										<ButtonComponent
											handleClick={() => null}
											label="Go to Home"
											background="#4db6ac"
										/>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default NotFoundPage;
