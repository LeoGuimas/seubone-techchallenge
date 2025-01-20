import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const EditRecortePage = () => {
  const [form, setForm] = useState({
    nomeModelo: '',
    ordemExibicao: 0,
    sku: '',
    tipoRecorte: '',
    posicaoRecorte: '',
    tipoProduto: '',
    materialRecorte: '',
    corMaterial: '',
    linkImagem: '',
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/recortes/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/recortes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...form }),
    }).then(() => {
      router.push('/recortes');
    });
  };

  return (
    <div>
      <h1>Editar Recorte</h1>
      <form onSubmit={handleSubmit}>
        <input name="nomeModelo" placeholder="Nome do Modelo" value={form.nomeModelo} onChange={handleChange} />
        <input name="ordemExibicao" type="number" placeholder="Ordem de Exibição" value={form.ordemExibicao} onChange={handleChange} />
        <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} />
        <input name="tipoRecorte" placeholder="Tipo do Recorte" value={form.tipoRecorte} onChange={handleChange} />
        <input name="posicaoRecorte" placeholder="Posição do Recorte" value={form.posicaoRecorte} onChange={handleChange} />
        <input name="tipoProduto" placeholder="Tipo do Produto" value={form.tipoProduto} onChange={handleChange} />
        <input name="materialRecorte" placeholder="Material do Recorte" value={form.materialRecorte} onChange={handleChange} />
        <input name="corMaterial" placeholder="Cor do Material" value={form.corMaterial} onChange={handleChange} />
        <input name="linkImagem" placeholder="Link da Imagem" value={form.linkImagem} onChange={handleChange} />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditRecortePage;