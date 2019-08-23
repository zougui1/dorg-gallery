import React from 'react';
import ReactPaginate from 'react-paginate';

import './Pagination.scss';

class Pagination extends React.Component {

  render() {
    let { currentPage } = this.props;
    currentPage = (+currentPage) - 1;

    return <ReactPaginate forcePage={currentPage} {...this.props} />;
  }
}

Pagination.defaultProps = {
  currentPage: 1,
  previousLabel: (
    <React.Fragment>
      <i className="fas fa-angle-left translate-y-11"></i>
      <span className="ml-2">previous</span>
    </React.Fragment>
  ),
  nextLabel: (
    <React.Fragment>
      <span className="mr-2">next</span>
      <i className="fas fa-angle-right translate-y-11"></i>
    </React.Fragment>
  ),
  breakLabel: '...',
  breakClassName: 'break',
  marginPagesDisplayed: 1,
  pageRangeDisplayed: 5,
  containerClassName: 'pagination',
  subContainerClassName: 'pages pagination',
  activeClassName: 'active'
};

export default Pagination;
