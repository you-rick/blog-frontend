import React from 'react';
import { NavLink } from 'react-router-dom';

const RegisterSuccess = () => (
  <div style={{ textAlign: 'center' }}>
    <h1>Successful Registration!</h1>
    <p>
      Now you can
      <NavLink to="/login">Log In</NavLink>
    </p>
  </div>
);

export default RegisterSuccess;
