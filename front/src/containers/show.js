import React from 'react';

const show = Component => ({ show, ...props }) => {
  return show
    ? <Component {...props} />
    : null;
}

export default show;
