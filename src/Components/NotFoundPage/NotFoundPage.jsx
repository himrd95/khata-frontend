import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import { Button } from "@mui/material";

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
                                    <h3 class="h3">Looks like you're lost</h3>
                                    <p className="subtitle">
                                        The page you are looking for not
                                        avaible!
                                    </p>

                                    <Link to="/">
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            handleClick={() => null}
                                            background="#4db6ac"
                                        >
                                            <div className="retryButton">
                                                Retry
                                            </div>
                                        </Button>
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
