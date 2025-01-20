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
      <h1>Modelos Cadastrados</h1>
      <Link href="/recortes/create">
        <button style={{ float: 'right' }}>Adicionar Peça</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Nome do Modelo</th>
            <th>SKU</th>
            <th>Tipo do Recorte</th>
            <th>Posição do Recorte</th>
            <th>Tipo do Produto</th>
            <th>Material do Recorte</th>
            <th>Cor do Material</th>
            <th>Link da Imagem</th>
          </tr>
        </thead>
        <tbody>
          {recortes.map((recorte) => (
            <tr key={recorte.id}>
              <td>{recorte.nomeModelo}</td>
              <td>{recorte.sku}</td>
              <td>{recorte.tipoRecorte}</td>
              <td>{recorte.posicaoRecorte}</td>
              <td>{recorte.tipoProduto}</td>
              <td>{recorte.materialRecorte}</td>
              <td>{recorte.corMaterial}</td>
              <td><a href={recorte.linkImagem} target="_blank" rel="noopener noreferrer">Ver Imagem</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecortesPage;