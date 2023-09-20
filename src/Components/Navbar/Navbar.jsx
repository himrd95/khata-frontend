import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { provider } from "../../Context/ContextPovider";
import speak from "../../utils/speech";
import FadeMenu from "./Menu";
import "./Navbar.css";

const Navbar = () => {
	const { adminPannel, setLoginPopup } = useContext(provider);

	return (
		<div className="nav">
			{adminPannel.token === "" && (
				<div className="nav_bar">
					<lottie-player
						src="https://assets3.lottiefiles.com/packages/lf20_ta0fa7bj.json"
						background="transparent"
						speed="1"
						loop
						count={1}
						style={{ width: "70px", height: "70px" }}
						autoplay
					></lottie-player>
					<Button
						onClick={() => {
							setLoginPopup(true);
						}}
						variant="contained"
						color="primary"
					>
						LogIn
					</Button>
				</div>
			)}
		</div>
	);
};

export default Navbar;
