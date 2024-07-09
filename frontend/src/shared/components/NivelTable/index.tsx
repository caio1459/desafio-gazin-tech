import React from 'react';
import { INivel } from '../../interfaces/INivel';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';

interface INivelTableHeaderProps {
  handleSortChange: (key: string) => void
}

export const NivelTableHeader: React.FC<INivelTableHeaderProps> = ({ handleSortChange }) => (
  <TableHeader
    columns={[
      { key: 'id', label: 'ID' },
      { key: 'nivel', label: 'Nível' },
    ]}
    handleSortChange={handleSortChange}
  />
);

interface INivelTableRowProps {
  nivel: INivel;
  handleEdit: (nivel: INivel) => void;
  handleDelete: (id: number) => void;
}

export const NivelTableRow: React.FC<INivelTableRowProps> = ({ nivel, handleEdit, handleDelete }) => (
  <TableRow
    item={nivel}
    columns={[
      { key: 'id' },
      { key: 'nivel' },
    ]}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
  />
);
