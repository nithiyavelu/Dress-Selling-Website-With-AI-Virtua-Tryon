import React, { useState } from 'react';
import { products } from '../data/products';
import { Row, Col, Card, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import heroBg from '../assets/images/hero-bg.jpg';
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

const Home = () => {
  const navigate = useNavigate();
  const { addToCart, toggleLike, isLiked } = useCart();
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const imageMap = {
    1: img1, 2: img2, 3: img3, 4: img4, 5: img5, 6: img6, 7: img7, 8: img8,
    9: img9, 10: img10, 11: img11, 12: img12, 13: img13, 14: img14, 15: img15,
    16: img16, 17: img17, 18: img18, 19: img19, 20: img20, 21: img21, 22: img22, 23: img23,
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    message.success(`${product.name} added to cart!`);
  };

  const handleLike = (product) => {
    toggleLike(product);
    if (isLiked(product.id)) {
      message.info(`${product.name} removed from likes`);
    } else {
      message.success(`${product.name} added to likes!`);
    }
  };

  return (
    <div>
      {/* Full Screen Hero Section */}
      <div style={{
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '40px'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}></div>
        
        <div style={{
          position: 'relative',
          textAlign: 'center',
          color: 'white',
          zIndex: 2,
          padding: '20px'
        }}>
          <Title level={1} style={{ 
            color: 'white', 
            fontSize: '4rem', 
            margin: 0,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            𝓙𝓞𝓝 𝓑𝓞𝓤𝓣𝓘𝓠𝓤𝓔
          </Title>
          <Text style={{ 
            color: 'white', 
            fontSize: '1.3rem', 
            display: 'block', 
            marginTop: '10px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            𝖸𝗈𝗎𝗋 𝖯𝖾𝗋𝖿𝖾𝖼𝗍 𝖥𝗂𝗍 𝖠𝗐𝖺𝗂𝗍𝗌 – 𝖤𝗑𝗉𝖾𝗋𝗂𝖾𝗇𝖼𝖾 𝗍𝗁𝖾 𝖬𝖺𝗀𝗂𝖼 𝗈𝖿 𝖵𝗂𝗋𝗍𝗎𝖺𝗅 𝖳𝗋𝗒-𝖮𝗇
          </Text>
          <Button 
            type="primary" 
            size="large"
            style={{ 
              marginTop: '20px',
              height: '50px',
              width: '200px',
              fontSize: '18px',
              borderRadius: '25px',
              background: '#FFD700',
              border: 'none',
              color: '#000',
              fontWeight: 'bold',
              boxShadow: '0 0 20px rgba(255,215,0,0.5)'
            }}
            onClick={() => {
              document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            ✦ SHOP NOW ✦
          </Button>
        </div>
      </div>

      {/* Products Section - UPDATED WITH GOLDEN THEME */}
      <div id="products-section" style={{ 
        padding: '60px 24px',
        background: 'linear-gradient(135deg, #fff9e6 0%, #fff2d9 50%, #ffe6cc 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative gold glitter elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(255,215,0,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }}></div>
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Title with Gold Glitter */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <Title level={2} style={{ 
              fontSize: '3rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255,215,0,0.3)',
              marginBottom: '15px'
            }}>
              ✦ 𝓞𝓾𝓻 𝓔𝔁𝓬𝓵𝓾𝓼𝓲𝓿𝓮 𝓒𝓸𝓵𝓵𝓮𝓬𝓽𝓲𝓸𝓷 ✦            </Title>
            <div style={{
              width: '200px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #FFD700, #B8860B, #FFD700, transparent)',
              margin: '0 auto 20px'
            }}></div>
            <Text style={{ 
              fontSize: '1.2rem', 
              color: '#B8860B',
              display: 'block',
              fontStyle: 'italic'
            }}>
              ᴰⁱˢᶜᵒᵛᵉʳ ʸᵒᵘʳ ᵖᵉʳᶠᵉᶜᵗ ˢᵗʸˡᵉ ʷⁱᵗʰ ᵖᵉʳᶠᵉᶜᵗ ᶠⁱᵗ
            </Text>
          </div>
          
          {/* Products Grid */}
          <Row gutter={[24, 24]}>
            {products.map(product => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Card
                  hoverable
                  style={{ 
                    borderRadius: 20, 
                    overflow: 'hidden',
                    border: '2px solid #FFD700',
                    boxShadow: '0 10px 30px rgba(255,215,0,0.2)',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(5px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,215,0,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,215,0,0.2)';
                  }}
                  cover={
                    <div style={{ 
                      height: 300, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #fff9e6 0%, #fff2d9 100%)',
                      padding: '15px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Gold corner accents */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '40px',
                        height: '40px',
                        borderTop: '3px solid #FFD700',
                        borderLeft: '3px solid #FFD700',
                        borderTopLeftRadius: '15px'
                      }}></div>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '40px',
                        height: '40px',
                        borderTop: '3px solid #FFD700',
                        borderRight: '3px solid #FFD700',
                        borderTopRightRadius: '15px'
                      }}></div>
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '40px',
                        height: '40px',
                        borderBottom: '3px solid #FFD700',
                        borderLeft: '3px solid #FFD700',
                        borderBottomLeftRadius: '15px'
                      }}></div>
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '40px',
                        height: '40px',
                        borderBottom: '3px solid #FFD700',
                        borderRight: '3px solid #FFD700',
                        borderBottomRightRadius: '15px'
                      }}></div>
                      
                      {/* Gold glitter overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 30% 30%, rgba(255,215,0,0.1) 0%, transparent 50%)',
                        pointerEvents: 'none',
                        zIndex: 1
                      }}></div>
                      
                      <img 
                        src={imageMap[product.id]} 
                        alt={product.name}
                        style={{ 
                          maxWidth: '100%',
                          maxHeight: '100%',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                          transition: 'transform 0.5s ease',
                          zIndex: 2,
                          filter: 'drop-shadow(0 5px 15px rgba(255,215,0,0.3))'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/300x400?text=Product";
                        }}
                      />
                      
                      {/* Discount badge */}
                      {product.discount && (
                        <div style={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          background: 'linear-gradient(135deg, #FFD700, #B8860B)',
                          color: '#000',
                          padding: '8px 15px',
                          borderRadius: '25px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          boxShadow: '0 0 20px rgba(255,215,0,0.7)',
                          zIndex: 3,
                          transform: 'rotate(5deg)'
                        }}>
                          ✦ {product.discount} ✦
                        </div>
                      )}
                    </div>
                  }
                  actions={[
                    <Button 
                      type="text" 
                      icon={<ShoppingCartOutlined style={{ color: '#B8860B' }} />} 
                      onClick={() => handleAddToCart(product)}
                      style={{ 
                        color: '#B8860B',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        transition: 'all 0.3s ease',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#FFD700';
                        e.target.style.color = '#000';
                        e.target.style.borderRadius = '0';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#B8860B';
                      }}
                    >
                      ADD
                    </Button>,
                    <Button 
                      type="text" 
                      icon={isLiked(product.id) ? <HeartFilled style={{ color: '#FFD700' }} /> : <HeartOutlined style={{ color: '#B8860B' }} />} 
                      onClick={() => handleLike(product)}
                      style={{ 
                        color: '#B8860B',
                        transition: 'all 0.3s ease',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#FFD700';
                        e.target.style.color = '#000';
                        e.target.style.borderRadius = '0';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#B8860B';
                      }}
                    />,
                    <Button 
                      type="text"
                      onClick={() => navigate(`/tryon/${product.id}`)}
                      style={{ 
                        color: '#B8860B',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        transition: 'all 0.3s ease',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#FFD700';
                        e.target.style.color = '#000';
                        e.target.style.borderRadius = '0';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#B8860B';
                      }}
                    >
                      TRY ON
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={
                      <span style={{ 
                        color: '#B8860B', 
                        fontSize: '16px', 
                        fontWeight: 'bold',
                        display: 'block',
                        marginBottom: '5px',
                        textAlign: 'center'
                      }}>
                        {product.name}
                      </span>
                    }
                    description={
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                          fontSize: 24, 
                          fontWeight: 'bold', 
                          color: '#B8860B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          marginBottom: '5px'
                        }}>
                          <span>₹{product.price}</span>
                          {product.originalPrice > product.price && (
                            <span style={{ 
                              fontSize: 16, 
                              textDecoration: 'line-through', 
                              color: '#999' 
                            }}>
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        {product.freeDelivery && (
                          <div style={{ 
                            color: '#B8860B', 
                            marginTop: 5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5px',
                            fontSize: '13px',
                            fontWeight: 'bold'
                          }}>
                            <span style={{ fontSize: '16px' }}>✨</span> FREE DELIVERY
                          </div>
                        )}
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Home;