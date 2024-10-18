// Carrinho.tsx
import React from 'react';
import { useCart } from '../../cartContext';

const Carrinho: React.FC = () => {
  const { cartItems } = useCart();

  return (
    <div>
      <h1>Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <h2>{item.nome}</h2>
              <p>Preço: R${item.preco}</p>
              <p>Ingredientes: {item.ingredientes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Carrinho;