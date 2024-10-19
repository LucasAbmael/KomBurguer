import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  nome: string;
  preco: string;
  ingredientes: string;
  imgUrl: string;
  quantidade: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (nome: string, quantidade: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'cartItems';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCartItems) {
        const parsedItems = JSON.parse(storedCartItems);
        if (Array.isArray(parsedItems)) {
          setCartItems(parsedItems);
        } else {
          console.error('Dados inválidos no localStorage:', parsedItems);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar o carrinho do localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      if (cartItems.length > 0) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Erro ao salvar o carrinho no localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.nome === item.nome);
      if (existingItem) {
        return prevItems.map((i) => 
          i.nome === item.nome ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantidade: 1 }];
      }
    });
  };

  const updateQuantity = (nome: string, quantidade: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.nome === nome ? { ...item, quantidade } : item
      )
    );
  };

  const removeFromCart = (index: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index);
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
