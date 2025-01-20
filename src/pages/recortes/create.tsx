import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateRecortePage = () => {
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/recortes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...form,
        ordemExibicao: Number(form.ordemExibicao), // Convertendo para número
      }),
    }).then((res) => {
      if (res.ok) {
        router.push('/recortes');
      } else {
        console.error('Failed to create recorte');
      }
    });
  };

  return (
    <div>
      <h1>Criar Recorte</h1>
      <form onSubmit={handleSubmit}>
        <input name="nomeModelo" placeholder="Nome do Modelo" onChange={handleChange} />
        <input name="ordemExibicao" type="number" placeholder="Ordem de Exibição" onChange={handleChange} />
        <input name="sku" placeholder="SKU" onChange={handleChange} />
        <input name="tipoRecorte" placeholder="Tipo do Recorte" onChange={handleChange} />
        <input name="posicaoRecorte" placeholder="Posição do Recorte" onChange={handleChange} />
        <input name="tipoProduto" placeholder="Tipo do Produto" onChange={handleChange} />
        <input name="materialRecorte" placeholder="Material do Recorte" onChange={handleChange} />
        <input name="corMaterial" placeholder="Cor do Material" onChange={handleChange} />
        <input name="linkImagem" placeholder="Link da Imagem" onChange={handleChange} />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default CreateRecortePage;