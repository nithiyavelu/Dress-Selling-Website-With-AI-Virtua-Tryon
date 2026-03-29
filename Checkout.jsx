import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Divider, message, Row, Col, Input, Form } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (values) => {
    setLoading(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        message.error('Failed to load payment gateway. Please try again.');
        setLoading(false);
        return;
      }

      // Create order with backend
      const response = await fetch('http://localhost:8080/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal, currency: 'INR' })
      });
      const orderData = await response.json();
      if (!response.ok) throw new Error(orderData.error || 'Failed to create order');

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'JON BOUTIQUE',
        description: 'Payment for your order',
        order_id: orderData.orderId,
        handler: async (paymentResponse) => {
          // Verify payment with backend
          const verificationRes = await fetch('http://localhost:8080/api/payments/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature
            })
          });
          const verificationData = await verificationRes.json();
          if (verificationData.success) {
            message.success('Payment successful!');
            clearCart();
            navigate('/');
          } else {
            message.error('Payment verification failed');
          }
        },
        prefill: {
          name: values.fullName,
          email: values.email,
          contact: values.phone
        },
        theme: { color: '#000' }
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      message.error(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 50, background: '#fff9e6', minHeight: '60vh' }}>
        <ShoppingOutlined style={{ fontSize: 48, color: '#000' }} />
        <Title level={3}>Your cart is empty</Title>
        <Button type="primary" onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff9e6', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', color: '#000' }}>Checkout</Title>
        <Row gutter={24}>
          <Col xs={24} md={16}>
            <Card title="Shipping Information" style={{ borderRadius: 8 }}>
              <Form form={form} layout="vertical" onFinish={handlePayment}>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
                      <Input placeholder="Enter your full name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                      <Input placeholder="Enter your email" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item name="phone" label="Phone Number" rules={[{ required: true, len: 10 }]}>
                      <Input placeholder="10-digit mobile number" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="address" label="Delivery Address" rules={[{ required: true }]}>
                      <Input.TextArea rows={2} placeholder="Enter your address" />
                    </Form.Item>
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit" loading={loading} block style={{ background: '#000', color: '#fff9e6' }}>
                  Proceed to Pay ₹{cartTotal}
                </Button>
              </Form>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Order Summary" style={{ borderRadius: 8 }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                  <Text>{item.name} x {item.quantity}</Text>
                  <Text strong>₹{item.price * item.quantity}</Text>
                </div>
              ))}
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18 }}>
                <strong>Total</strong>
                <strong>₹{cartTotal}</strong>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer isDarkMode={false} />
    </div>
  );
};

export default Checkout;