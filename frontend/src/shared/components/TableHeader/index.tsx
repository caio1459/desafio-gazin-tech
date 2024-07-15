import React from 'react';

interface TableHeaderProps {
  columns: { key: string; label: string }[];
  handleSortChange: (field: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ columns, handleSortChange }) => (
  <thead className="table-light">
    <tr>
      {columns.map(column => (
        <th key={column.key} onClick={() => handleSortChange(column.key)} className="sortable-column">
          {column.label}
        </th>
      ))}
      <th className='text-center'>Ações</th>
    </tr>
  </thead>
);
