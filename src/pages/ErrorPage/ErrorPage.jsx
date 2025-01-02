import React from 'react'
import titleName from '../../hooks/useTitle';
import { useMoveBack } from "../../hooks/useMoveBack";



//import css
import "./ErrorPage.css"

/* import img */
import Eror from "../../assets/icon-error.png"

const ErrorPage = () => {
    const goBack = useMoveBack();
    titleName('Eror Page 404');
    return (
        <div className="eror-content">
            <button onClick={goBack} size="large">
                &larr; Go back
            </button>

            <div className="main-content">
                <img src={Eror} alt="" className='img-eror' />
                <p className='text-eror vibrate-1'>This page not exist</p>
                <img src={Eror} alt="" className='img-eror' />
            </div>


        </div>
    )
}

export default ErrorPage