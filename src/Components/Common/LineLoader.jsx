import React from "react";
import { LoaderContainer, LoaderLine } from "./LineLoader.styles";

const LineLoader = ({ className, style }) => {
    return (
        <LoaderContainer className={className} style={style}>
            <LoaderLine />
        </LoaderContainer>
    );
};

export default LineLoader;
