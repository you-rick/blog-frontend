import React from 'react';
import s from './Preloader.module.scss';

let Preloader = (props) => {
    return (
        <div className={s.spinnerWrap}>
            <div className={s.spinner}>
                <div className={s.dot1}></div>
                <div className={s.dot2}></div>
            </div>
        </div>
    );
};

export default Preloader;
