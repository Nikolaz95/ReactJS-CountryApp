import React from 'react'


/* import pagination */
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

//import css
import "./Pagination.css"

const Paginationn = ({ countriesPerPage, totalCountries, handlePageChange, currentPage }) => {
    const pageCount = Math.ceil(totalCountries / countriesPerPage);

    return (

        <Stack spacing={2}>
            <Pagination
                count={pageCount}  // Total number of pages
                page={currentPage} // Current active page
                onChange={handlePageChange} // Handle page change
                variant="outlined" color="secondary"
            />
        </Stack>
    )
}

export default Paginationn