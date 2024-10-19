import React, { useState } from 'react';
import styles from "./MenuItem.module.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useCart } from '../../cartContext';

interface MenuItemProps {
  nome: string;
  preco: string;
  ingredientes?: string; // Tornando a propriedade ingredientes opcional
  imgUrl: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ nome, preco, ingredientes, imgUrl }) => {
  const { addToCart } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddToCart = () => {
    const item = { nome, preco, ingredientes: ingredientes || '', imgUrl, quantidade: 1 }; // Usando '' se ingredientes não estiver definido
    addToCart(item);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerTop}>
        <div className={styles.details}>
          <img src={imgUrl} alt="Imagem do Produto" style={{ width: "70px", height: "70px", borderRadius: "35px" }} />
          <div className={styles.informacoes}>
            <h2 className={styles.itemNome}>{nome}</h2>
            <p className={styles.itemPreco}>R${preco}</p>
          </div>
        </div>
        <div className={styles.options}>
          <button onClick={handleAddToCart} style={{ border: "none", outline: "none", background: "none" }}>
            <IoAddCircleSharp size={30} color="#F29D38" />
          </button>
          {ingredientes && ( // Renderiza os botões de expansão apenas se ingredientes estiver definido
            <button onClick={toggleExpand} style={{ border: "none", outline: "none", background: "none" }}>
              {isExpanded ? <IoIosArrowUp size={30} color="#333333" /> : <IoIosArrowDown size={30} color="#333333" />}
            </button>
          )}
        </div>
      </div>
      {isExpanded && ingredientes && ( // Renderizando ingredientes apenas se estiverem definidos
        <div className={styles.containerBottom}>
          <p style={{ fontFamily: "Poppins", fontWeight: "700", fontSize: "1.2rem", color: "#333333" }}>Ingredientes</p>
          <p className={styles.itemDescricao}>{ingredientes}</p>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
