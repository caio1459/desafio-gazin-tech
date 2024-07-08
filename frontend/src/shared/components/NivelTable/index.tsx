import React from 'react';
import { INivel } from '../../interfaces/INivel';

interface TableHeaderProps {
  handleSortChange: (field: string) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ handleSortChange }) => (
  <thead>
    <tr>
      <th onClick={() => handleSortChange('id')}>ID</th>
      <th onClick={() => handleSortChange('nivel')}>Nível</th>
      <th>Ações</th>
    </tr>
  </thead>
);

interface TableRowProps {
  nivel: INivel;
  handleEdit: (nivel: INivel) => void;
  handleDelete: (id: number) => void;
}

export const TableRow: React.FC<TableRowProps> = ({ nivel, handleEdit, handleDelete }) => (
  <tr key={nivel.id}>
    <td>{nivel.id}</td>
    <td>{nivel.nivel}</td>
    <td>
      <button type="button" className="btn btn-info me-1" onClick={() => handleEdit(nivel)}>
        <i className="bi bi-pencil-square"></i>
      </button>
      <button type="button" className="btn btn-danger" onClick={() => handleDelete(nivel.id)}>
        <i className="bi bi-trash"></i>
      </button>
    </td>
  </tr>
);
