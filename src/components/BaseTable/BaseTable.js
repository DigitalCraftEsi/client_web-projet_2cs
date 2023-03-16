import { React, useMemo } from "react";
import { useTable } from 'react-table';
import "./styles.css"
import "@fontsource/poppins";

const BaseTable = () => {
    const data = useMemo(
        () => [
            {
                id: '1',
                email: 'jamal@gmail.com',
                nom: 'Jamal',
                tel: '0771890493',
                details: 'Details',
            },
            {
                id: '2',
                email: 'taher32@gmail.com',
                nom: 'Taher',
                tel: '0771899876',
                details: 'Details',
            },
            {
                id: '3',
                email: 'kamel@gmail.com',
                nom: 'Kamel',
                tel: '0678980989',
                details: 'Details',
            },
            {
                id: '4',
                email: 'mohamed567@gamil.com',
                nom: 'mohamed',
                tel: '0578568934',
                details: 'Details',
            },
            {
                id: '4',
                email: 'mohamed567@gamil.com',
                nom: 'mohamed',
                tel: '0578568934',
                details: 'Details',
            }
        ],
        []
    )

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Nom',
                accessor: 'nom',
            },
            {
                Header: 'Telephone',
                accessor: 'tel',
            },
            {
                Header: '',
                accessor:'details',
                className: 'details',
            }
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
        <div style={{
            width: '964px',
            height: '562px',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
            }} >
                <button>Nouveau Client</button>
            </div>
            <table {...getTableProps()} style={{
                textAlign: 'center', width: '100%'
            }} >
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{
                                        borderBottom: 'solid 1px black',
                                        color: '#757575',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        fontFamily: 'Poppins',
                                        lineHeight: '18px',
                                        padding: '40px',
                                        paddingBottom: '10px',
                                    }}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                padding: '10px',
                                                fontFamily: 'Poppins',
                                                fontStyle: 'normal',
                                                fontWeight: '400',
                                                fontSize: '12px',
                                                lineHeight: '18px',
                                                color: '#555555'
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table >
        </div>
    )
}

export default BaseTable;