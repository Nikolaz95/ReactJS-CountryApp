import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

//import css
import "./Pagination.css"

// Page numbers to show, with "…" for skipped ranges, e.g. 1 … 4 5 6 … 11
const getPages = (page, count) => {
    if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, '…', count];
    if (page >= count - 3) return [1, '…', count - 4, count - 3, count - 2, count - 1, count];
    return [1, '…', page - 1, page, page + 1, '…', count];
};

const Paginationn = ({ page, pageCount, onChange }) => {
    if (pageCount <= 1) return null;

    return (
        <nav className="pagination" aria-label="Pagination">
            <button
                className="page-btn page-arrow"
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
            >
                <FiChevronLeft />
            </button>

            <ul className="page-list">
                {getPages(page, pageCount).map((item, index) =>
                    item === '…' ? (
                        <li key={`gap-${index}`} className="page-gap" aria-hidden="true">…</li>
                    ) : (
                        <li key={item}>
                            <button
                                className="page-btn"
                                onClick={() => onChange(item)}
                                aria-current={item === page ? 'page' : undefined}
                            >
                                {item}
                            </button>
                        </li>
                    )
                )}
            </ul>

            <span className="page-compact">Page {page} of {pageCount}</span>

            <button
                className="page-btn page-arrow"
                onClick={() => onChange(page + 1)}
                disabled={page === pageCount}
                aria-label="Next page"
            >
                <FiChevronRight />
            </button>
        </nav>
    )
}

export default Paginationn
