import React from 'react';
import s from './Preloader.module.scss';

let Preloader = (props) => {
    return (
        <React.Fragment>
            <div className={s.ldsEllipsis}>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
            </div>
        </React.Fragment>
    );
};

export default Preloader;
