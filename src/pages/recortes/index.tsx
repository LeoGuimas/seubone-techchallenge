import { useEffect, useState } from 'react';
import Link from 'next/link';

const RecortesPage = () => {
  const [recortes, setRecortes] = useState([]);

  useEffect(() => {
    fetch('/api/recortes')
      .then((res) => res.json())
      .then((data) => setRecortes(data));
  }, []);

  return (
    <div>
      <h1>Recortes</h1>
      <Link href="/recortes/create">Criar Recorte</Link>
      <ul>
        {recortes.map((recorte) => (
          <li key={recorte.id}>
            {recorte.nomeModelo} - {recorte.sku}
            <Link href={`/recortes/edit/${recorte.id}`}>Editar</Link>
            <button onClick={() => handleDelete(recorte.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );

  function handleDelete(id) {
    fetch('/api/recortes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then(() => {
      setRecortes(recortes.filter((recorte) => recorte.id !== id));
    });
  }
};

export default RecortesPage;