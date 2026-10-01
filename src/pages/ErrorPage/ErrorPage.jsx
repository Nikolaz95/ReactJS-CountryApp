import React from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiGlobe } from 'react-icons/fi';
import useTitle from '../../hooks/useTitle';
import { useMoveBack } from "../../hooks/useMoveBack";

//import css
import "./ErrorPage.css"

const ErrorPage = () => {
    const goBack = useMoveBack();
    useTitle('Page not found | Where in the world?');

    return (
        <div className="container eror-content">
            <div className="eror-code animate-fade-up" aria-hidden="true">
                4<FiGlobe className="eror-globe" />4
            </div>
            <h1 className="animate-fade-up" style={{ '--delay': 1 }}>Lost somewhere on the map</h1>
            <p className="animate-fade-up" style={{ '--delay': 2 }}>This page doesn’t exist. Let’s get you back on track.</p>
            <div className="eror-actions animate-fade-up" style={{ '--delay': 3 }}>
                <button onClick={goBack} className="btn">
                    <FiArrowLeft /> Go back
                </button>
                <Link to="/" className="btn btn-primary">All countries</Link>
            </div>
        </div>
    )
}

export default ErrorPage
