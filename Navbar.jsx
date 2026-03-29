import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCartOutlined, HeartOutlined, HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';

const Navbar = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    message.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav style={{
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a1f0a 100%)',
      borderBottom: '3px solid #FFD700',
      boxShadow: '0 2px 20px rgba(255, 215, 0, 0.3)'
    }}>
      {/* Logo/Brand */}
      <Link 
        to="/" 
        style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          textDecoration: 'none', 
          color: '#FFD700', 
          textShadow: '0 0 15px rgba(255,215,0,0.7)',
          letterSpacing: '1px'
        }}
      >
        ✦ JON BOUTIQUE ✦
      </Link>
      
      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {/* Home Button */}
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            fontSize: 16, 
            color: '#FFD700',
            transition: 'all 0.3s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#FFF3B0';
            e.target.style.textShadow = '0 0 10px #FFD700';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#FFD700';
            e.target.style.textShadow = 'none';
          }}
        >
          <HomeOutlined /> Home
        </Link>
        
        {/* Likes Button */}
        <Link 
          to="/likes" 
          style={{ 
            textDecoration: 'none', 
            fontSize: 16, 
            color: '#FFD700',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#FFF3B0';
            e.target.style.textShadow = '0 0 10px #FFD700';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#FFD700';
            e.target.style.textShadow = 'none';
          }}
        >
          <HeartOutlined /> Likes
        </Link>
        
        {/* Cart Button - NOW MATCHES LIKE BUTTON EXACTLY */}
        <Link 
          to="/cart" 
          style={{ 
            textDecoration: 'none', 
            fontSize: 16, 
            color: '#FFD700',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#FFF3B0';
            e.target.style.textShadow = '0 0 10px #FFD700';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#FFD700';
            e.target.style.textShadow = 'none';
          }}
        >
          <ShoppingCartOutlined /> Cart
          {cartCount > 0 && (
            <span style={{
              backgroundColor: '#FFD700',
              color: '#000',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px',
              fontWeight: 'bold',
              marginLeft: '2px',
              boxShadow: '0 0 10px #FFD700'
            }}>
              {cartCount}
            </span>
          )}
        </Link>
        
        {/* User Section */}
        {isLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#FFD700', fontSize: 16 }}>
              <UserOutlined /> {username}
            </span>
            <Button 
              type="text" 
              icon={<LogoutOutlined />} 
              onClick={handleLogout}
              style={{ 
                color: '#FFD700',
                fontSize: 14,
                padding: '4px 12px',
                height: 'auto',
                border: '1px solid #FFD700',
                borderRadius: '20px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#FFD700';
                e.target.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#FFD700';
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link 
            to="/login" 
            style={{ 
              textDecoration: 'none', 
              fontSize: 16, 
              color: '#FFD700',
              padding: '4px 16px',
              border: '1px solid #FFD700',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#FFD700';
              e.target.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#FFD700';
            }}
          >
            <UserOutlined /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;