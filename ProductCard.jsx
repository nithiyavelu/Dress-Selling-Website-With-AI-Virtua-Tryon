import React from 'react';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Rate, Tag, message } from 'antd';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

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

const imageMap = {
  1: img1, 2: img2, 3: img3, 4: img4, 5: img5, 6: img6, 7: img7, 8: img8,
  9: img9, 10: img10, 11: img11, 12: img12, 13: img13, 14: img14, 15: img15,
  16: img16, 17: img17, 18: img18, 19: img19, 20: img20, 21: img21, 22: img22, 23: img23,
};

const ProductCard = ({ product }) => {
  const { addToCart, toggleLike, isLiked, cartItems, likedItems } = useCart();
  const navigate = useNavigate();
  const liked = isLiked(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    message.success(`${product.name} added to cart!`);
  };

  const handleToggleLike = () => {
    toggleLike(product);
    if (liked) {
      message.info(`${product.name} removed from likes`);
    } else {
      message.success(`${product.name} added to likes!`);
    }
  };

  return (
    <Card
      hoverable
      style={{ borderRadius: 15, overflow: 'hidden' }}
      cover={
        <div style={{ 
          height: 250, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          padding: '10px'
        }}>
          <img 
            alt={product.name} 
            src={imageMap[product.id] || `https://via.placeholder.com/300x400?text=${product.name}`} 
            style={{ 
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x400?text=Product";
            }}
          />
        </div>
      }
      actions={[
        <Button 
          type="text" 
          icon={<ShoppingCartOutlined />} 
          onClick={handleAddToCart}
        >
          Add
        </Button>,
        <Button 
          type="text" 
          icon={liked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} 
          onClick={handleToggleLike}
        />,
        <Button 
          type="text" 
          onClick={() => navigate(`/tryon/${product.id}`)}
        >
          Try On
        </Button>
      ]}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16 }}>{product.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <Rate disabled defaultValue={product.rating} style={{ fontSize: 12 }} />
            <span style={{ color: '#666' }}>({product.reviews?.toLocaleString() || 0})</span>
          </div>
        </div>
        {product.trusted && (
          <Tag color="blue">Trusted</Tag>
        )}
      </div>
      
      <div style={{ marginTop: 12 }}>
        <span style={{ fontSize: 20, fontWeight: 'bold', color: '#f50' }}>
          ₹{product.price}
        </span>
        {product.originalPrice > product.price && (
          <>
            <span style={{ marginLeft: 8, textDecoration: 'line-through', color: '#999' }}>
              ₹{product.originalPrice}
            </span>
            <span style={{ marginLeft: 8, color: 'green' }}>
              {product.discount}
            </span>
          </>
        )}
      </div>

      {product.freeDelivery && (
        <div style={{ marginTop: 8, color: 'green' }}>
          Free Delivery
        </div>
      )}
    </Card>
  );
};

export default ProductCard;