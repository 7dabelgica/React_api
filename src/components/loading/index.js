import React from 'react';
import { CgSearchLoading } from 'react-icons/cg';
import PropTypes from 'prop-types';

import { Container } from './styled';

export default function Loading({ isLoading }) {
  if (!isLoading) return <> </>;
  return (
    <Container>
      <div />
      <span>
        <CgSearchLoading className="icon" />
      </span>
    </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
