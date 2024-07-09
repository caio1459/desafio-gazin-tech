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
  <tr key={item.id}>
    {columns.map(column => (
      <td key={String(column.key)}>
        {column.render ? column.render(item[column.key]) : String(item[column.key])}
      </td>
    ))}
    <td>
      <button type="button" className="btn btn-info me-1" onClick={() => handleEdit(item)}>
        <i className="bi bi-pencil-square"></i>
      </button>
      <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.id)}>
        <i className="bi bi-trash"></i>
      </button>
    </td>
  </tr>
);
