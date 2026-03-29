import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  // Handle Login
  const onLoginFinish = (values) => {
    setLoading(true);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === values.email && u.password === values.password);
    
    setTimeout(() => {
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', user.name);
        localStorage.setItem('userEmail', user.email);
        message.success('Login successful!');
        navigate('/');
      } else {
        message.error('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  // Handle Sign Up
  const onSignupFinish = (values) => {
    setLoading(true);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.email === values.email)) {
      message.error('User with this email already exists!');
      setLoading(false);
      return;
    }
    
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    setTimeout(() => {
      message.success(`Welcome ${values.name}! Your account has been created. Please login.`);
      setActiveTab('login');
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card style={{ width: 450, padding: 24 }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>👗 Fashion AI</Title>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
          <TabPane tab="Login" key="login">
            <Form name="login" onFinish={onLoginFinish} layout="vertical">
              <Form.Item name="email" rules={[{ required: true, message: 'Please enter email!' }, { type: 'email', message: 'Please enter valid email!' }]}>
                <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please enter password!' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} size="large" block>Log in</Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Sign Up" key="signup">
            <Form name="signup" onFinish={onSignupFinish} layout="vertical">
              <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name!' }]}>
                <Input prefix={<UserOutlined />} placeholder="Full Name" size="large" />
              </Form.Item>
              <Form.Item name="email" rules={[{ required: true, message: 'Please enter email!' }, { type: 'email', message: 'Please enter valid email!' }]}>
                <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please enter password!' }, { min: 6, message: 'Password must be at least 6 characters!' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
              </Form.Item>
              <Form.Item name="confirmPassword" dependencies={['password']} rules={[{ required: true, message: 'Please confirm password!' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('password') === value) return Promise.resolve(); return Promise.reject(new Error('Passwords do not match!')); } })]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} size="large" block>Create Account</Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 16 }}>Create your account or login to continue</Text>
      </Card>
    </div>
  );
};

export default Login;