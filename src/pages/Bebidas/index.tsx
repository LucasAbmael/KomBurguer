// Bebidas.tsx
import React, { useEffect, useState } from 'react';
import { Menu } from "../../Components/Menu";
import Img from "../../assets/imagens/refrigerante.png"; // Imagem da bebida
import MenuItem from '../../Components/MenuItem'; // Importa o componente MenuItem

interface Bebida {
  nome: string;
  preco: string;
  ingredientes: string;
}

const Bebidas: React.FC = () => {
  const [bebidas, setBebidas] = useState<Bebida[]>([]);
  const [filteredBebidas, setFilteredBebidas] = useState<Bebida[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('./cardapio/bebidas.json')
      .then((response) => response.json())
      .then((data) => {
        setBebidas(data);
        setFilteredBebidas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar o cardápio:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (term: string) => {
    const filtered = bebidas.filter((bebida) =>
      bebida.nome.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBebidas(filtered);
  };

  return (
    <div>
      <Menu image={Img} alternative="Imagem de uma bebida" onSearch={handleSearch} />
      <div>
        <div>
          {loading ? (
            <p>Carregando...</p>
          ) : filteredBebidas.length === 0 ? (
            <p>Nada foi encontrado.</p>
          ) : (
            filteredBebidas.map((bebida, index) => (
              <MenuItem
                key={index}
                nome={bebida.nome}
                preco={bebida.preco}
                ingredientes={bebida.ingredientes}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bebidas;