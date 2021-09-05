import Button from 'src/components/Button';
import CheckCell from 'src/components/CheckCell';
import BaseTable from 'src/layouts/BaseTable';

export default function Table({ header, keys, data, deleteHandler, to }) {
  return (
    <BaseTable
      header={header.map((h) => h.toUpperCase())}
      body={data.map((row) => (
        <tr key={row._id}>
          {keys.map((col, id) => (
            <CheckCell key={`${row._id} ${id}`} children={row[col]} />
          ))}

          <td>
            {!!deleteHandler && <Button xs className="danger" label="Del." onClick={() => deleteHandler(row)} />}
            {!!to && <Button xs label="Edit" to={`${to}${row._id}/edit`} />}
          </td>
        </tr>
      ))}
    />
  );
}
