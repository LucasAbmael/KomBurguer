import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lanches from './pages/Lanches';
import Bebidas from './pages/Bebidas';
import Carrinho from './pages/Carrinho';
import { CartProvider } from "./cartContext"

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Lanches />} />
          <Route path="/bebidas" element={<Bebidas />} />
          <Route path="/carrinho" element={<Carrinho />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
