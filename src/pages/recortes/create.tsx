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
        <select name="tipoRecorte" onChange={handleChange}>
          <option value="">Selecione o Tipo do Recorte</option>
          <option value="frente">Frente</option>
          <option value="aba">Aba</option>
          <option value="lateral">Lateral</option>
        </select>
        <input name="posicaoRecorte" placeholder="Posição do Recorte" onChange={handleChange} />
        <select name="tipoProduto" onChange={handleChange}>
          <option value="">Selecione o Modelo</option>
          <option value="Trucker">Trucker</option>
          <option value="Americano">Americano</option>
        </select>
        <select name="materialRecorte" onChange={handleChange}>
          <option value="">Selecione o Tecido</option>
          <option value="Linho">Linho</option>
        </select>
        <select name="corMaterial" onChange={handleChange}>
          <option value="">Selecione a Cor do Tecido</option>
          <option value="Azul marinho">Azul marinho</option>
          <option value="Laranja">Laranja</option>
        </select>
        <input name="linkImagem" placeholder="Link da Imagem" onChange={handleChange} />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default CreateRecortePage;