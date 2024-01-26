import React from 'react'

function CustomPagination(
  {  pageCount,
    pageSize,
    setPageSize,
    pageIndex,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    previousPage,
    nextPage,
    list}
) {
    return (
        <div className="row">
            <div className='col-8 d-flex'>
                <select
                    className='fs-5'
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {list.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                <div className='mx-2 fs-5 my-auto'>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </div>
            </div>
            <div className='col-4 page-box fs-5 ps-1'>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {"<"}
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {">>"}
                </button>
            </div>
        </div>
    )
}

export default CustomPagination