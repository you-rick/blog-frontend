import React from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../../store/profileReducer';
import Author from '../../public/Authors/Author/Author';

const Profile = ({ profile }) => <Author profile={profile} />;

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Profile);
