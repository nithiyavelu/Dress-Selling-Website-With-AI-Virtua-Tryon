import React from 'react';
import { useCart } from '../context/CartContext';
import { Row, Col, Empty, Typography, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
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

const { Title } = Typography;

const imageMap = {
  1: img1, 2: img2, 3: img3, 4: img4, 5: img5, 6: img6, 7: img7, 8: img8,
  9: img9, 10: img10, 11: img11, 12: img12, 13: img13, 14: img14, 15: img15,
  16: img16, 17: img17, 18: img18, 19: img19, 20: img20, 21: img21, 22: img22, 23: img23,
};

const Likes = () => {
  const { likedItems, toggleLike, addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    message.success(`${product.name} added to cart!`);
  };

  const handleUnlike = (product) => {
    toggleLike(product);
    message.info(`${product.name} removed from likes`);
  };

  if (likedItems.length === 0) {
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
          <HeartOutlined style={{ fontSize: 40, color: '#000' }} />
        </div>
        <Title level={2} style={{ color: '#000', marginBottom: '10px' }}>
          No Liked Items
        </Title>
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
          BROWSE PRODUCTS
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
            ✦ YOUR WISHLIST ✦
          </Title>
          <div style={{
            width: '100px',
            height: '3px',
            background: '#000',
            margin: '15px auto'
          }}></div>
        </div>

        <Row gutter={[24, 24]}>
          {likedItems.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                style={{ 
                  borderRadius: 8,
                  border: '1px solid #000',
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                cover={
                  <div style={{ 
                    height: 280, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#fff9e6',
                    padding: '15px',
                    borderBottom: '1px solid #000'
                  }}>
                    <img 
                      src={imageMap[product.id]} 
                      alt={product.name}
                      style={{ 
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                    {product.discount && (
                      <div style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: '#000',
                        color: '#fff9e6',
                        padding: '4px 8px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        borderRadius: 4
                      }}>
                        {product.discount}
                      </div>
                    )}
                  </div>
                }
                actions={[
                  <Button 
                    type="text" 
                    icon={<ShoppingCartOutlined style={{ color: '#000' }} />}
                    onClick={() => handleAddToCart(product)}
                    style={{ color: '#000' }}
                  >
                    ADD
                  </Button>,
                  <Button 
                    type="text" 
                    icon={<HeartFilled style={{ color: '#000' }} />}
                    onClick={() => handleUnlike(product)}
                    style={{ color: '#000' }}
                  />,
                  <Button 
                    type="text"
                    onClick={() => navigate(`/tryon/${product.id}`)}
                    style={{ color: '#000' }}
                  >
                    TRY ON
                  </Button>
                ]}
              >
                <Card.Meta
                  title={
                    <span style={{ color: '#000', fontSize: '15px', fontWeight: 'bold' }}>
                      {product.name}
                    </span>
                  }
                  description={
                    <div>
                      <span style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>
                        ₹{product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span style={{ 
                          marginLeft: 8,
                          textDecoration: 'line-through', 
                          color: '#999' 
                        }}>
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Footer isDarkMode={false} />
    </div>
  );
};

export default Likes;