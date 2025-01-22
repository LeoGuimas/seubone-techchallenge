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
        .then((data) => setForm(data))
        .catch((error) => console.error('Failed to fetch recorte:', error));
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
    fetch(`/api/recortes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.ok) {
        router.push('/recortes');
      } else {
        console.error('Failed to update recorte');
      }
    });
  };

  return (
    <div>
      <h1>Editar Recorte</h1>
      <form onSubmit={handleSubmit}>
        <input name="nomeModelo" placeholder="Nome do Modelo" value={form.nomeModelo} onChange={handleChange} />
        <input name="ordemExibicao" type="number" placeholder="Ordem de Exibição" value={form.ordemExibicao} onChange={handleChange} />
        <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} />
        <select name="tipoRecorte" value={form.tipoRecorte} onChange={handleChange}>
          <option value="">Selecione o Tipo do Recorte</option>
          <option value="frente">Frente</option>
          <option value="aba">Aba</option>
          <option value="lateral">Lateral</option>
        </select>
        <input name="posicaoRecorte" placeholder="Posição do Recorte" value={form.posicaoRecorte} onChange={handleChange} />
        <select name="tipoProduto" value={form.tipoProduto} onChange={handleChange}>
          <option value="">Selecione o Modelo</option>
          <option value="Trucker">Trucker</option>
          <option value="Americano">Americano</option>
        </select>
        <select name="materialRecorte" value={form.materialRecorte} onChange={handleChange}>
          <option value="">Selecione o Tecido</option>
          <option value="Linho">Linho</option>
        </select>
        <select name="corMaterial" value={form.corMaterial} onChange={handleChange}>
          <option value="">Selecione a Cor do Tecido</option>
          <option value="Azul marinho">Azul marinho</option>
          <option value="Laranja">Laranja</option>
        </select>
        <input name="linkImagem" placeholder="Link da Imagem" value={form.linkImagem} onChange={handleChange} />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditRecortePage;