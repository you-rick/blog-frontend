import React from 'react';
import s from './Preloader.module.scss';

const Preloader = () => (
  <div className={s.spinnerWrap}>
    <div className={s.spinner}>
      <div className={s.dot1} />
      <div className={s.dot2} />
    </div>
  </div>
);

export default Preloader;
