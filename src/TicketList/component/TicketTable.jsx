import React, { useState, useEffect } from 'react';
import "./TicketTable.css";
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import CustomFilter from './CustomFilter';
import CustomPagination from './CustomPagination';

function TicketTable({ 
    columns,
    data,
    onSort,
}) {
    const [filter, setSearch] = useState("");

    const props = useTable(
        {
            columns,
            data,
            manualSortBy: true,
            autoResetPage: false,
            autoResetSortBy: true
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, sortBy }
    } = props;

    const setSearchValue = (value) => {
        setSearch(value);
    }

    useEffect(() => {
        setGlobalFilter(filter);
        onSort(sortBy, filter,data);
    }, [ sortBy, filter]);

    return (
        <div>
            <CustomFilter search={setSearchValue} toggle={getToggleHideAllColumnsProps} allcolumns={allColumns} filter={filter} />
            <table className='table table-responsive border-box-style p-3 mt-3'  {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} >
                            {headerGroup.headers.map((column) => (
                                <td {...column.getHeaderProps(column.getSortByToggleProps())} className='m-2  table-text1'>
                                    {column.render("Header")}
                                    <span >
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? <i className='bi bi-chevron-down mx-2' />
                                                : <i className='bi bi-chevron-up mx-2' />
                                            : ""}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    ))}

                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()} className='table-text'>{cell.render("Cell",{id:row.cells[0].value})}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <CustomPagination
                pageCount={pageCount}
                pageSize={pageSize}
                setPageSize={setPageSize}
                pageIndex={pageIndex}
                pageOptions={pageOptions}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                gotoPage={gotoPage}
                previousPage={previousPage}
                nextPage={nextPage}
                list={[10, 20, 30, 40, 50]}
            />
        </div>
    )
}

export default TicketTable