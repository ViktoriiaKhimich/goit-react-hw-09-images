import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Spinner = () => {
    return (<Loader style={{ textAlign: "center" }} type="ThreeDots" color="#3f51b5" height={80} width={80} timeout={3000} />);
}

export default Spinner;