import React from 'react';
import ReactPaginate from 'react-paginate';

import './Pagination.scss';

class Pagination extends React.Component {

  render() {
    return <ReactPaginate {...this.props} />;
  }
}

Pagination.defaultProps = {
  previousLabel: <i class="fas fa-angle-left"></i>,
  nextLabel: <i class="fas fa-angle-right"></i>,
  breakLabel: '...',
  breakClassName: 'break',
  marginPagesDisplayed: 1,
  pageRangeDisplayed: 5,
  containerClassName: 'pagination',
  subContainerClassName: 'pages pagination',
  activeClassName: 'active'
};

export default Pagination;
