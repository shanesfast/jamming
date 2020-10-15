import { useContext, useState } from 'react';
import { GlobalContext } from "../context/GlobalState";
import PropTypes from 'prop-types';

const usePagination = () => {
  const [state, setState] = useContext(GlobalContext);
  const { pageOfItems, editListTracks } = state;

  const [pagerState, setPagerState] = useState({ 
    pager: {}, 
    initialPage: 1,
    pageSize: 10
  });
  let { initialPage, pager, pageSize } = pagerState;

  // useEffect(function() {
  //   // set page if items array isn't empty
  //   if (editListTracks && editListTracks.length) {
  //       setPage(initialPage);
  //   }
  // });

  function onChangePage() { 
    setState({ ...state, pageOfItems: pageOfItems });
  }

  function setPage(page) {
    if (page < 1 || page > pager.totalPages) {
        return;
    }

    // get new pager object for specified page
    pager = getPager(editListTracks.length, page, pageSize);

    // get new page of Tracks from editListTracks array
    var pageOfItems = editListTracks.slice(pager.startIndex, pager.endIndex + 1);

    setPagerState({ pager: pager });
    onChangePage(pageOfItems);
  }

  function getPager(totalItems, currentPage, pageSize) {
    console.log(totalItems, currentPage, pageSize);
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
  }

  return {
    initialPage,
    pager,
    setPage,
    editListTracks
  }
};

usePagination.propTypes = {
  editListTracks: PropTypes.array.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number
}

export default usePagination;