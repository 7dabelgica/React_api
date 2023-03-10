import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import { Nav } from './styled';
import history from '../../services';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} color="#fff" />
      </Link>
      <Link to="/register" className="middle">
        <FaUserAlt size={24} color="#fff" />
      </Link>
      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/">
          <FaPowerOff size={24} color="#fff" />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} color="#fff" />
        </Link>
      )}

      {isLoggedIn && (
        <Link to="/">
          <FaCircle size={24} color="#fff" />
        </Link>
      )}
    </Nav>
  );
}
