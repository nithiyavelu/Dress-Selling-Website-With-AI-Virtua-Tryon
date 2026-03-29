import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Cart from './pages/Cart';
import TryOn from './pages/TryOn';
import Likes from './pages/Likes';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Checkout from './pages/Checkout';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/tryon/:productId" element={<TryOn />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/login" element={<Login />} />
	  <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;