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
      { key: 'devs_count', label: 'Devs Associados' }
    ]}
    handleSortChange={handleSortChange}
  />
);

interface INivelTableRowProps {
  nivel: INivel;
  handleEdit: (nivel: INivel) => void;
  handleDelete: (nivel: INivel) => void;
}

export const NivelTableRow: React.FC<INivelTableRowProps> = ({ nivel, handleEdit, handleDelete }) => (
  <TableRow
    item={nivel}
    columns={[
      { key: 'id' },
      { key: 'nivel' },
      { key: 'devs_count' }
    ]}
    handleEdit={handleEdit}
    handleDelete={() => handleDelete(nivel)}
  />
);
