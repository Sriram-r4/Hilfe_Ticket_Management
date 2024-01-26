import React, { useState, useEffect } from 'react';
import "../../TicketList/component/TicketTable.css";
import { useTable, useSortBy, usePagination } from 'react-table';
import CustomPagination from '../../TicketList/component/CustomPagination';

function SettingsTable({
    columns,
    data,
    onSort,
    type
}) {
    const props = useTable(
        {
            columns,
            data,
            manualSortBy: true,
            autoResetPage: false,
            autoResetSortBy: true
        },
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


    useEffect(() => {
        setPageSize(5);
        onSort(sortBy, data, type);
    }, [sortBy]);
    return (
        <div>
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
                                            : "  "}
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
                                        <td {...cell.getCellProps()} className='table-text'>{cell.render("Cell", { id: row.values.id, prod: row.values.prodname, cat: row.values.catname })}</td>
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
                list={[5, 10, 20, 30, 40, 50]}
            />
        </div>
    );
}

export default SettingsTable