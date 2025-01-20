import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ViewRecortePage = () => {
  const [recorte, setRecorte] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/recortes/${id}`)
        .then((res) => res.json())
        .then((data) => setRecorte(data));
    }
  }, [id]);

  if (!recorte) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Detalhes do Recorte</h1>
      <p><strong>Nome do Modelo:</strong> {recorte.nomeModelo}</p>
      <p><strong>Ordem de Exibição:</strong> {recorte.ordemExibicao}</p>
      <p><strong>SKU:</strong> {recorte.sku}</p>
      <p><strong>Tipo do Recorte:</strong> {recorte.tipoRecorte}</p>
      <p><strong>Posição do Recorte:</strong> {recorte.posicaoRecorte}</p>
      <p><strong>Tipo do Produto:</strong> {recorte.tipoProduto}</p>
      <p><strong>Material do Recorte:</strong> {recorte.materialRecorte}</p>
      <p><strong>Cor do Material:</strong> {recorte.corMaterial}</p>
      <p><strong>Link da Imagem:</strong> <a href={recorte.linkImagem} target="_blank" rel="noopener noreferrer">Ver Imagem</a></p>
    </div>
  );
};

export default ViewRecortePage;