import { ReactNode } from 'react';

interface TableRowProps<T> {
  item: T;
  columns: { key: keyof T; render?: (value: any) => ReactNode }[];
  handleEdit: (item: T) => void;
  handleDelete: (id: number) => void;
}

export const TableRow = <T extends { id: number }>({
  item,
  columns,
  handleEdit,
  handleDelete,
}: TableRowProps<T>) => (
  <tr key={item.id} className="align-middle">
    {columns.map(column => (
      <td key={String(column.key)} className="table-cell">
        {column.render ? column.render(item[column.key]) : String(item[column.key])}
      </td>
    ))}
    <td className="text-center">
      <button type="button" className="btn btn-info btn-sm me-1" onClick={() => handleEdit(item)}>
        <i className="bi bi-pencil-square"></i>
      </button>
      <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
        <i className="bi bi-trash"></i>
      </button>
    </td>
  </tr>
);
