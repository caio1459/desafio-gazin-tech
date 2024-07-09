import React from 'react';
import { IDesenvolvedor } from '../../interfaces/IDesenvolvedor';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';

interface IDevTableHeaderProps {
  handleSortChange: (key: string) => void
}

export const DevTableHeader: React.FC<IDevTableHeaderProps> = ({ handleSortChange }) => (
  <TableHeader
    columns={[
      { key: 'id', label: 'ID' },
      { key: 'nome', label: 'Nome' },
      { key: 'sexo', label: 'Sexo' },
      { key: 'nivel_id', label: 'Nível' },
    ]}
    handleSortChange={handleSortChange}
  />
);

interface IDevTableRowProps {
  desenvolvedor: IDesenvolvedor;
  handleEdit: (desenvolvedor: IDesenvolvedor) => void;
  handleDelete: (id: number) => void;
}

export const DevTableRow: React.FC<IDevTableRowProps> = ({ desenvolvedor, handleEdit, handleDelete }) => (
  <TableRow
    item={desenvolvedor}
    columns={[
      { key: 'id' },
      { key: 'nome' },
      { key: 'sexo' },
      { key: 'nivel', render: (nivel) => nivel.nivel },
    ]}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
  />
);