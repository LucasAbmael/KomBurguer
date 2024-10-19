import React, { useState, useEffect } from 'react';
import { useCart } from '../../cartContext';
import { FaTrash } from "react-icons/fa";
import styles from "./Carrinho.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import burguerTriste from "../../assets/imagens/hamburguer-triste.png";

const Carrinho: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  
  // Estado para armazenar o nome do usuário
  const [nome, setNome] = useState('');
  const [erroNome, setErroNome] = useState(false);
  
  // Estado para armazenar o endereço do usuário
  const [endereco, setEndereco] = useState('');
  const [erroEndereco, setErroEndereco] = useState(false);

  // Estado para armazenar a forma de pagamento
  const [formaPagamento, setFormaPagamento] = useState('');
  const [erroPagamento, setErroPagamento] = useState(false);

  const CART_ADDRESS_KEY = 'enderecoEntrega';

  useEffect(() => {
    const storedEndereco = localStorage.getItem(CART_ADDRESS_KEY);
    if (storedEndereco) {
      setEndereco(storedEndereco);
    }
  }, []);

  useEffect(() => {
    if (endereco.trim() === '') {
      localStorage.removeItem(CART_ADDRESS_KEY);
    } else {
      localStorage.setItem(CART_ADDRESS_KEY, endereco);
    }
  }, [endereco]);

  const handleRemoverItem = (index: number) => {
    removeFromCart(index);
  };

  const handleQuantityChange = (nome: string, quantidade: number) => {
    if (quantidade >= 1) {
      updateQuantity(nome, quantidade);
    }
  };

  const calcularTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.preco) * item.quantidade, 0).toFixed(2);
  };

  const handleFinalizarPedido = () => {
    if (nome.trim() === '') {
      setErroNome(true);
      return;
    }

    if (endereco.trim() === '') {
      setErroEndereco(true);
      return;
    }

    if (formaPagamento.trim() === '') {
      setErroPagamento(true);
      return;
    }

    const numeroWhatsApp = '5583999884375';
    const mensagem = cartItems.map(item => `${item.quantidade} ${item.nome}`).join('\n');
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(`Pedido:\n\nNome: ${nome}\n\n${mensagem}\n\nTotal: R$${calcularTotal()}\n\nEndereço: ${endereco}\n\nForma de Pagamento: ${formaPagamento}`)}`;

    window.open(url, '_blank');
    clearCart();
  };

  return (
    <div>
      <div className={styles.top}>
        <button onClick={() => navigate(-1)} style={{ border: "none", outline: "none", background: "none" }}>
          <IoIosArrowBack size={30} color="#333333" />
        </button>
        <h1 className={styles.titulo}>Carrinho</h1>
      </div>
      {cartItems.length === 0 ? (
        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 60 }}>
          <img src={burguerTriste} alt="hamburguer triste" style={{ width: 200, filter: "grayScale(1)" }} />
          <p>O carrinho está vazio.</p>
        </div>
      ) : (
        <div>
          {/* Input para o usuário adicionar o nome */}
          <div className={styles.campoNome}>
            <h3 style={{ fontFamily: "Poppins", fontSize: 14, fontWeight: "600", display: "flex", flexDirection: "row", gap: 4, marginLeft: 8 }}>O pedido será no nome de:<p style={{ fontSize: 18, color: "#d32525" }}>*</p></h3>
            <input 
              type="text" 
              className={styles.userNome}
              value={nome} 
              onChange={(e) => {
                setNome(e.target.value);
                setErroNome(false);
              }} 
              placeholder="Digite seu nome"
              style={{ borderColor: erroNome ? 'red' : '' }}
            />
            {erroNome && <p style={{ color: 'red', fontFamily: "Poppins" }}>Por favor, insira seu nome.</p>}
          </div>

          {/* Input para o usuário adicionar o endereço */}
          <div className={styles.campoEndereco}>
            <h3 style={{ fontFamily: "Poppins", fontSize: 14, fontWeight: "600", display: "flex", flexDirection: "row", gap: 4, marginLeft: 8 }}>Devemos enviar o pedido para:<p style={{ fontSize: 18, color: "#d32525" }}>*</p></h3>
            <input 
              type="text" 
              className={styles.userEndereco}
              value={endereco} 
              onChange={(e) => {
                setEndereco(e.target.value);
                setErroEndereco(false);
              }} 
              placeholder="Digite seu endereço para entrega do pedido"
              style={{ borderColor: erroEndereco ? 'red' : '' }}
            />
            {erroEndereco && <p style={{ color: 'red', fontFamily: "Poppins" }}>Por favor, insira o endereço de entrega.</p>}
          </div>

          {/* Seletor de forma de pagamento */}
          <div className={styles.campoPagamento}>
            <h3 style={{ fontFamily: "Poppins", fontSize: 14, fontWeight: "600", display: "flex", flexDirection: "row", gap: 4, marginLeft: 8 }}>Forma de Pagamento: <p style={{ fontSize: 18, color: "#d32525" }}>*</p></h3>
            <select 
              className={styles.userPagamento}
              value={formaPagamento}
              onChange={(e) => {
                setFormaPagamento(e.target.value);
                setErroPagamento(false);
              }}
              style={{ borderColor: erroPagamento ? 'red' : '' }}
            >
              <option value="">Selecione...</option>
              <option value="Pix">Pix</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
            {erroPagamento && <p style={{ color: 'red', fontFamily: "Poppins" }}>Por favor, selecione a forma de pagamento.</p>}
          </div>

          <ul style={{ paddingBottom: 100 }}>
            {cartItems.map((item, index) => (
              <li key={index} className={styles.container}>
                <div className={styles.containerTop}>
                  <div className={styles.details}>
                    <img src={item.imgUrl} alt="Imagem do Produto" style={{ width: 70, height: 70, borderRadius: 35 }} />
                    <div className={styles.informacoes}>
                      <h2 className={styles.itemNome}>{item.nome}</h2>
                      <p className={styles.itemPreco}>R${item.preco}</p>
                    </div>
                  </div>
                  <div className={styles.options}>
                    <button onClick={() => handleRemoverItem(index)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <FaTrash size={25} color="red" />
                    </button>
                  </div>
                </div>
                <div className={styles.containerBottom}>
                  <p style={{ fontFamily: "Poppins", fontSize: "1rem", fontWeight: "500" }}>Quantidade:</p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() => handleQuantityChange(item.nome, item.quantidade - 1)}
                      disabled={item.quantidade <= 1}
                      style={{
                        background: '#FFF',
                        border: '1px solid #ccc',
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        width: 25,
                        height: 30,
                        cursor: item.quantidade <= 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantidade}
                      onChange={(e) => handleQuantityChange(item.nome, parseInt(e.target.value))}
                      min="1"
                      style={{ margin: 0, width: 50, height: 30, border: "none", outline: "none", background: "#f5f5f5", fontSize: "1rem", textAlign: "center", borderTop: "1px solid #CCC", borderBottom: "1px solid #CCC" }}
                    />
                    <button
                      onClick={() => handleQuantityChange(item.nome, item.quantidade + 1)}
                      style={{
                        background: '#FFF',
                        border: '1px solid #ccc',
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        width: 25,
                        height: 30,
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.total}>
            <h2 style={{ fontFamily: "Poppins", fontSize: "1.5rem", fontWeight: "500", color: "#626262" }}>Total: R${calcularTotal()}</h2>
            <button onClick={handleFinalizarPedido} style={{ fontFamily: "Poppins", fontSize: "1rem", fontWeight: "700", color: "#FFF", background: "#F29D38", border: "none", outline: "none", borderRadius: 20, padding: 10 }}>Finalizar Pedido</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;
