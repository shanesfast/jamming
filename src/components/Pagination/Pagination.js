import React from 'react';
import usePagination from '../../hooks/usePagination';
import './Pagination.css';

const Pagination = (props) => {
    const { pager, setPage } = usePagination();

    // componentDidMount() {
    //     // set page if items array isn't empty
    //     if (this.props.items && this.props.items.length) {
    //         this.setPage(this.props.initialPage);
    //     }
    // }

    // useEffect(function() {
    //     // set page if items array isn't empty
    //     if (tracks && tracks.length) {
    //         setPage(initialPage);
    //     }
    // });

    return (
        <ul className="pagination">
            <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                <button onClick={() => setPage(1)}>First</button>
                {console.log(pager)}
            </li>
            <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                <button onClick={() => setPage(pager.currentPage - 1)}>&#60;</button>
            </li>
            {pager.pages.map((page, index) =>
                <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                    <button onClick={() => setPage(page)}>{page}</button>
                </li>
            )}
            <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                <button onClick={() => setPage(pager.currentPage + 1)}>&#62;</button>
            </li>
            <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                <button onClick={() => setPage(pager.totalPages)}>Last</button>
            </li>
        </ul>
    );
}

export default Pagination;
