import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table';
import { TableContainer, StyledTable, TableHeader, TableCell } from './Styles';
import Input from '../Common/Input/Input';

type DataTableProps = {
  data: any[];
  columns: { Header: string; accessor: string }[];
};

// Table data
const data = [];

const Table = ({ data = [], columns = [] }: DataTableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <TableContainer>
      <Input
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Filtrar..."
        margin="0 0 1rem 0"
      />
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
