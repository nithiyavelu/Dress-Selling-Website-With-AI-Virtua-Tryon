import React from 'react';
import { useCart } from '../context/CartContext';
import { Empty, Button, Card, InputNumber, Typography, Divider, Row, Col } from 'antd';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

// Import your product images
import img1 from '../assets/images/top-1.jpg';
import img2 from '../assets/images/top-2.jpg';
import img3 from '../assets/images/top-3.jpg';
import img4 from '../assets/images/top-4.jpg';
import img5 from '../assets/images/top-5.jpg';
import img6 from '../assets/images/top-6.jpg';
import img7 from '../assets/images/top-7.jpg';
import img8 from '../assets/images/top-8.jpg';
import img9 from '../assets/images/top-9.jpg';
import img10 from '../assets/images/top-10.jpg';
import img11 from '../assets/images/top-11.jpg';
import img12 from '../assets/images/top-12.jpg';
import img13 from '../assets/images/top-13.jpg';
import img14 from '../assets/images/top-14.jpg';
import img15 from '../assets/images/top-15.jpg';
import img16 from '../assets/images/top-16.jpg';
import img17 from '../assets/images/top-17.jpg';
import img18 from '../assets/images/top-18.jpg';
import img19 from '../assets/images/top-19.jpg';
import img20 from '../assets/images/top-20.jpg';
import img21 from '../assets/images/top-21.jpg';
import img22 from '../assets/images/top-22.jpg';
import img23 from '../assets/images/top-23.jpg';

const { Title, Text } = Typography;

const imageMap = {
  1: img1, 2: img2, 3: img3, 4: img4, 5: img5, 6: img6, 7: img7, 8: img8,
  9: img9, 10: img10, 11: img11, 12: img12, 13: img13, 14: img14, 15: img15,
  16: img16, 17: img17, 18: img18, 19: img19, 20: img20, 21: img21, 22: img22, 23: img23,
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div style={{ 
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff9e6',
        padding: '40px 20px'
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          border: '2px solid #000'
        }}>
          <ShoppingOutlined style={{ fontSize: 40, color: '#000' }} />
        </div>
        <Title level={2} style={{ color: '#000', marginBottom: '10px' }}>
          Your Cart is Empty
        </Title>
        <Text style={{ color: '#000', opacity: 0.7, marginBottom: '30px' }}>
          Looks like you haven't added anything yet
        </Text>
        <Button 
          type="primary" 
          size="large"
          onClick={() => navigate('/')}
          style={{ 
            background: '#000',
            border: 'none',
            color: '#fff9e6',
            fontWeight: 'bold',
            height: '45px',
            width: '200px',
            fontSize: '16px',
            boxShadow: '0 0 20px rgba(0,0,0,0.3)'
          }}
        >
          CONTINUE SHOPPING
        </Button>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff9e6', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={1} style={{ 
            color: '#000', 
            fontSize: '3rem',
            margin: 0,
            textShadow: '0 0 20px rgba(0,0,0,0.1)'
          }}>
            ✦ YOUR CART ✦
          </Title>
          <div style={{
            width: '100px',
            height: '3px',
            background: '#000',
            margin: '15px auto'
          }}></div>
        </div>
        
        <Row gutter={[24, 24]}>
          {/* Cart Items */}
          <Col xs={24} lg={16}>
            {cartItems.map(item => (
              <Card 
                key={item.id} 
                style={{ 
                  marginBottom: 16, 
                  borderRadius: 8,
                  background: '#fff',
                  border: '1px solid #000',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* Product Image */}
                  <div style={{ 
                    width: 120, 
                    height: 150, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#fff9e6',
                    padding: '10px',
                    border: '1px solid #000'
                  }}>
                    <img
                      src={imageMap[item.id]}
                      alt={item.name}
                      style={{ 
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div style={{ flex: 1 }}>
                    <Title level={4} style={{ color: '#000', margin: '0 0 8px 0' }}>
                      {item.name}
                    </Title>
                    <Text style={{ color: '#000', fontSize: 18, display: 'block', marginBottom: 15 }}>
                      ₹{item.price}
                    </Text>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15, flexWrap: 'wrap' }}>
                      <InputNumber
                        min={1}
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item.id, value)}
                        style={{ 
                          width: 80,
                          background: '#fff',
                          borderColor: '#000',
                          color: '#000'
                        }}
                      />
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeFromCart(item.id)}
                        style={{ 
                          background: 'transparent',
                          border: '1px solid #ff4d4f',
                          color: '#ff4d4f'
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div style={{ 
                    fontSize: 22, 
                    fontWeight: 'bold', 
                    color: '#000',
                    minWidth: 100,
                    textAlign: 'right'
                  }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              </Card>
            ))}
          </Col>

          {/* Order Summary */}
          <Col xs={24} lg={8}>
            <Card 
              style={{ 
                borderRadius: 8,
                background: '#fff',
                border: '1px solid #000',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: 20
              }}
              title={
                <span style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>
                  ORDER SUMMARY
                </span>
              }
            >
              <div style={{ padding: '10px 0' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: 15,
                  color: '#000'
                }}>
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span style={{ fontWeight: 'bold', color: '#000' }}>₹{cartTotal}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: 15,
                  color: '#000'
                }}>
                  <span>Shipping</span>
                  <span style={{ color: '#52c41a' }}>FREE</span>
                </div>
                <Divider style={{ background: '#000', opacity: 0.2 }} />
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: 20,
                  fontSize: 18
                }}>
                  <strong style={{ color: '#000' }}>Total</strong>
                  <strong style={{ color: '#000', fontSize: 22 }}>₹{cartTotal}</strong>
                </div>
                
                <Button 
                  type="primary" 
                  block 
                  size="large"
                  onClick={() => navigate('/checkout')}
                  style={{ 
                    height: 50, 
                    fontSize: 16,
                    background: '#000',
                    border: 'none',
                    color: '#fff9e6',
                    fontWeight: 'bold',
                    marginBottom: 10,
                    boxShadow: '0 0 20px rgba(0,0,0,0.3)'
                  }}
                >
                  PROCEED TO CHECKOUT
                </Button>
                
                <Button 
                  block 
                  onClick={() => navigate('/')}
                  style={{ 
                    height: 45,
                    background: 'transparent',
                    border: '1px solid #000',
                    color: '#000'
                  }}
                >
                  CONTINUE SHOPPING
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer isDarkMode={false} />
    </div>
  );
};

export default Cart;