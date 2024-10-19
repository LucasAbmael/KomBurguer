import React, { useState } from "react";
import { FaBars, FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import styles from "./Menu.module.css";
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { MdContactSupport } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";

interface Props {
  image: string;
  alternative: string;
  onSearch: (term: string) => void;
}

export const Menu: React.FC<Props> = ({ image, alternative, onSearch }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const [searchVisible, setSearchVisible] = useState(false); // Estado para controlar a visibilidade do campo de pesquisa
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Chama a função onSearch ao digitar
  };

  return (
    <div className={styles.Menu}>
      <div className={styles.menuTop}>
        <div style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center"}}>
          <button onClick={toggleMenu} style={{ border: "none", outline: "none", background: "none" }}>
            <FaBars size={25} color="#626262" />
          </button>
          <Link to="/Carrinho"><FaCartShopping size={25} color="#626262"/></Link>
        </div>
        {isOpen && (
          <nav className={styles.navMenu}>
            <button onClick={toggleMenu} style={{ border: "none", outline: "none", background: "none" }}>
              <IoClose size={40} color="#626262" />
            </button>
            <Link to="/Carrinho" className={styles.menuLink}><FaCartShopping size={24} color="#626262"/>Carrinho</Link>
            <a href="https://wa.me//555190135176" about="_blank" className={styles.menuLink}><MdContactSupport size={24} color="#626262" />Contato</a>
            <a href="https://instagram.com/komburguernh" about="_blank" className={styles.menuLink}><AiFillInstagram size={24} color="#626262" />Nosso Instagram</a>
          </nav>
        )}
        <a href="#" className={styles.menuLogo}>KomBurguer</a>
        <FaSearch size={25} color="#626262" onClick={handleSearchClick} style={{ cursor: "pointer" }} />
      </div>

      {/* Input de pesquisa com animação */}
      <div className={`${styles.searchBar} ${searchVisible ? styles.visible : ""}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Pesquisar..."
          className={styles.searchInput}
        />
      </div>

      <img src={image} alt={alternative} />

      <div className={styles.menuBottom}>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? styles.active : styles.inactive}
        >
          Lanches
        </NavLink>
        
        <NavLink 
          to="/bebidas" 
          className={({ isActive }) => isActive ? styles.active : styles.inactive}
        >
          Bebidas
        </NavLink>
      </div>
    </div>
  );
};