// MenuItem.tsx
import React from 'react';
import styles from "./MenuItem.module.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useCart } from '../../cartContext';

interface MenuItemProps {
  nome: string;
  preco: string;
  ingredientes: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ nome, preco, ingredientes }) => {

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const item = { nome, preco, ingredientes };
    addToCart(item);
    alert(`${nome} adicionado ao carrinho!`); // Mensagem de confirmação
  };

  return (
    <div className={styles.container}>
      <div className={styles.detais}>
        <div style={{ width: "70px", height: "70px", borderRadius: "35px", background: "#CCC" }}></div>
        <div className={styles.informacoes}>
          <h2>{nome}</h2>
          <p>Preço: R${preco}</p>
        </div>
      </div>
      <div className={styles.options}>
        <button onClick={handleAddToCart} style={{ border: "none", outline: "none", background: "none" }}>
          <IoAddCircleSharp size={30} color="#F29D38" />
        </button>
        <IoIosArrowDown size={30} color="#333333" />
      </div>
    </div>
  );
};

export default MenuItem;
