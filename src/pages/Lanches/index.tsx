// Lanches.tsx
import React, { useEffect, useState } from 'react';
import { Menu } from "../../Components/Menu";
import Img from "../../assets/imagens/hamburguer.png";
import HamburguerTriste from "../../assets/imagens/hamburguer-triste.png"; // Imagem do hamburguer triste
import MenuItem from '../../Components/MenuItem'; // Importa o componente MenuItem

interface Lanche {
  nome: string;
  preco: string;
  ingredientes: string;
  imgUrl: string;
}

const Lanches: React.FC = () => {
  const [lanches, setLanches] = useState<Lanche[]>([]);
  const [filteredLanches, setFilteredLanches] = useState<Lanche[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('./cardapio/lanches.json')
      .then((response) => response.json())
      .then((data) => {
        setLanches(data);
        setFilteredLanches(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar o cardápio:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (term: string) => {
    const filtered = lanches.filter((lanche) =>
      lanche.nome.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredLanches(filtered);
  };

  return (
    <div>
      <Menu image={Img} alternative="Imagem de um hamburguer" onSearch={handleSearch} />
      <div>
        <div>
          {loading ? (
            <p>Carregando...</p>
          ) : filteredLanches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <img src={HamburguerTriste} alt="Hamburguer triste" style={{ width: '150px', filter: "grayScale(1)" }} />
              <p>Nada foi encontrado.</p>
            </div>
          ) : (
            filteredLanches.map((lanche, index) => (
              <MenuItem
                key={index}
                nome={lanche.nome}
                preco={lanche.preco}
                ingredientes={lanche.ingredientes}
                imgUrl={lanche.imgUrl}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Lanches;
