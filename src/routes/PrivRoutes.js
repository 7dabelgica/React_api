import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function PrivRoutes({
  component: Component,
  isClosed,
  ...rest
}) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { prevPath: rest.location.pathname },
        }}
      />
    );
  }

  // eslint-disable-next-line
  return <Route { ...rest } component ={Component} />;
}

PrivRoutes.defaultProps = {
  isClosed: false,
};

PrivRoutes.propTypes = {
  component: Proptypes.oneOfType([Proptypes.element, Proptypes.func])
    .isRequired,
  isClosed: Proptypes.bool,
};
