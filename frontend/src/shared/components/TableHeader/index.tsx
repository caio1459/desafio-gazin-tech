import React from 'react';


interface TableHeaderProps {
  columns: { key: string; label: string }[];
  handleSortChange: (field: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ columns, handleSortChange }) => (
  <thead>
    <tr>
      {columns.map(column => (
        <th key={column.key} onClick={() => handleSortChange(column.key)}>
          {column.label}
        </th>
      ))}
      <th>Ações</th>
    </tr>
  </thead>
);
