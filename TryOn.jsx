import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from 'antd'; 
import {
  Layout,
  ConfigProvider,
  theme,
  Button,
  Typography,
  Switch,
  Input,
  Row,
  Col,
  Divider,
} from "antd";
import {
  BulbOutlined,
  BulbFilled,
} from "@ant-design/icons";

import ImageUpload from "../components/ImageUpload";
import Footer from '../components/Footer';
import { products } from '../data/products';

// Import your actual images
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

const { Header, Content} = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

function TryOn() {
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [personImage, setPersonImage] = useState(null);
  const [clothImage, setClothImage] = useState(null);
  const [clothImagePreview, setClothImagePreview] = useState(null);
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [modelType, setModelType] = useState("");
  const [gender, setGender] = useState("");
  const [garmentType, setGarmentType] = useState("");
  const [style, setStyle] = useState("");

  const resultRef = useRef(null);

  const defaultAlgorithm = theme?.defaultAlgorithm;
  const darkAlgorithm = theme?.darkAlgorithm;

  // Image mapping
  const imageMap = {
    1: img1, 2: img2, 3: img3, 4: img4, 5: img5, 6: img6, 7: img7, 8: img8,
    9: img9, 10: img10, 11: img11, 12: img12, 13: img13, 14: img14, 15: img15,
    16: img16, 17: img17, 18: img18, 19: img19, 20: img20, 21: img21, 22: img22, 23: img23,
  };

  // Load selected product when page loads
  useEffect(() => {
    if (productId) {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
        setSelectedProduct(product);
        setGarmentType(product.category === 'dresses' ? 'dress' : product.category);
        
        // Check if image exists for this product
        const productImage = imageMap[product.id];
        if (productImage) {
          setClothImagePreview(productImage);
          
          // Convert image to file object if needed for API
          fetch(productImage)
            .then(res => res.blob())
            .then(blob => {
              const file = new File([blob], 'dress.jpg', { type: 'image/jpeg' });
              setClothImage(file);
            })
            .catch(err => console.error("Error loading image:", err));
        } else {
          console.log("No image found for product ID:", product.id);
          setClothImagePreview(null);
        }
      }
    }
  }, [productId]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e, retryCount = 0) => {
  e.preventDefault();
  if (!personImage || !clothImage) {
    toast.error("Please upload both person and cloth images");
    return;
  }

  setLoading(true);

  try {
    const personBase64 = await fileToBase64(personImage);
    const clothBase64 = await fileToBase64(clothImage);

    const GOOGLE_API_KEY = "AIzaSyA5refwS3a4XoiG9jnwVA0_04L0kM8RO8c";
    
    // Your instinct was correct! This IS the model for images.
    const imageModels = [
  "gemini-3.1-flash-image-preview",  // Available - Nano Banana 2
  "gemini-3-pro-image-preview",       // Available - Nano Banana Pro
  "nano-banana-pro-preview"           // Available - alternative name
];    
    const currentModel = imageModels[retryCount % imageModels.length];

    // --- CRITICAL FIX: The correct request structure ---
    const requestBody = {
      contents: [{
        parts: [
          { text: "Create a photorealistic image of the person from the first image wearing the clothing from the second image. The clothing should fit naturally on the person. Preserve the person's face and body exactly." },
          { inlineData: { mimeType: "image/jpeg", data: personBase64 } }, // NOTE: camelCase 'inlineData' and 'mimeType'
          { inlineData: { mimeType: "image/jpeg", data: clothBase64 } }
        ]
      }],
      generationConfig: {
        responseModalities: ["Image"] // NOTE: Capital 'I' in 'Image'
      }
    };
    // --- End of fix ---

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${GOOGLE_API_KEY}`,
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("API Response:", response.data);

    let imageData = null;

    // Check ALL parts for image
    if (response.data?.candidates?.[0]?.content?.parts) {
      const parts = response.data.candidates[0].content.parts;
      
      // Look through every part
      for (let i = 0; i < parts.length; i++) {
        if (parts[i]?.inlineData?.data) {
          imageData = parts[i].inlineData.data;
          break;
        } else if (parts[i]?.inline_data?.data) {
          imageData = parts[i].inline_data.data;
          break;
        }
      }
    }
    
    if (imageData) {
      const resultImageUrl = `data:image/jpeg;base64,${imageData}`;
      const newResult = {
        id: Date.now(),
        resultImage: resultImageUrl,
        text: "AI Generated Try-On Result",
        timestamp: new Date().toLocaleString(),
      };
      setResult(newResult);
      setHistory(prev => [newResult, ...prev]);
      toast.success("AI Try-on completed!");
      setLoading(false);
    } else {
      toast.error("No image in response. Check console.");
      setLoading(false);
    }
    
  } catch (error) {
    console.error("Error:", error);
    
    // Handle 503 errors with exponential backoff
    if (error.response?.status === 503 && retryCount < 9) {
      const waitTime = Math.pow(2, retryCount) * 1000; 
      console.log(`Model overloaded. Retrying in ${waitTime/1000}s... (Attempt ${retryCount + 1}/9)`);
      
      toast.info(`AI service busy. Retrying in ${waitTime/1000} seconds...`, {
        autoClose: waitTime
      });
      
      setTimeout(() => {
        setLoading(false);
        const newEvent = { preventDefault: () => {} };
        handleSubmit(newEvent, retryCount + 1);
      }, waitTime);
      return;
    }
    
    // Handle 400 errors - maybe due to format? Try next model.
    if (error.response?.status === 400 && retryCount < 9) {
      console.log(`Received 400 error. Trying next model...`);
      setTimeout(() => {
        setLoading(false);
        const newEvent = { preventDefault: () => {} };
        handleSubmit(newEvent, retryCount + 1);
      }, 500);
      return;
    }
    
    // Handle other errors
    if (error.response?.status === 503) {
      toast.error("AI service is currently busy. Please try again later.");
    } else if (error.response?.status === 429) {
      toast.error("Rate limit exceeded. Please wait a moment.");
    } else if (error.response?.status === 403) {
      toast.error("API key invalid or billing not enabled.");
    } else {
      toast.error(error.response?.data?.error?.message || "Processing failed");
    }
    setLoading(false);
  }
};
  const bgColor = isDarkMode ? "#0f0f0f" : "#f9fafb";
  const cardColor = isDarkMode ? "#1c1c1c" : "#ffffff";
  const textColor = isDarkMode ? "#e4e4e4" : "#111827";
  const subText = isDarkMode ? "#9ca3af" : "#4b5563";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: { colorPrimary: "#0ea5e9", borderRadius: 10 },
      }}
    >
      <Layout style={{ minHeight: "100vh", background: bgColor }}>
        <Header style={{ background: "transparent", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 2rem" }}>
          <Title level={3} style={{ margin: 0, color: textColor }}>👗 Virtual Try-On</Title>
          <Switch checked={isDarkMode} onChange={setIsDarkMode} checkedChildren={<BulbFilled />} unCheckedChildren={<BulbOutlined />} />
        </Header>
        <Content style={{ flex: 1, padding: "2rem 1rem" }}>
          <div className="max-w-5xl mx-auto">
            {selectedProduct && (
              <div style={{ textAlign: 'center', marginBottom: 30, padding: 20, background: cardColor, borderRadius: 12 }}>
                <Title level={4} style={{ color: textColor }}>Trying on: {selectedProduct.name}</Title>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 10 }}>
                  <div><Text style={{ color: subText }}>Price:</Text><div style={{ fontSize: 18, color: '#f50' }}>₹{selectedProduct.price}</div></div>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <div><Text style={{ color: subText }}>Original:</Text><div style={{ textDecoration: 'line-through', color: '#999' }}>₹{selectedProduct.originalPrice}</div></div>
                  )}
                </div>
              </div>
            )}

            <Title level={1} className="text-center" style={{ color: textColor, marginBottom: 40 }}>Try-On Clothes in Seconds</Title>

            <form onSubmit={handleSubmit}>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <div style={{ background: cardColor, padding: 24, borderRadius: 12 }}>
                    <Title level={4} style={{ color: textColor, marginBottom: 16 }}>Your Photo</Title>
                    <ImageUpload label="Upload Your Photo" onImageChange={setPersonImage} isDarkMode={isDarkMode} />
                    <div className="mt-6 space-y-4">
                      <div><Text style={{ color: subText }}>Model Type</Text>
                        <Select placeholder="Select model type" style={{ width: "100%", marginTop: 4 }} value={modelType} onChange={setModelType}>
                          <Option value="top">Top Half</Option><Option value="bottom">Bottom Half</Option><Option value="full">Full Body</Option>
                        </Select>
                      </div>
                      <div><Text style={{ color: subText }}>Gender</Text>
                        <Select placeholder="Select gender" style={{ width: "100%", marginTop: 4 }} value={gender} onChange={setGender}>
                          <Option value="male">Male</Option><Option value="female">Female</Option><Option value="unisex">Unisex</Option>
                        </Select>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} md={12}>
                  <div style={{ background: cardColor, padding: 24, borderRadius: 12 }}>
                    <Title level={4} style={{ color: textColor, marginBottom: 16 }}>{selectedProduct ? 'Selected Dress' : 'Garment Image'}</Title>
                    {selectedProduct && clothImagePreview ? (
                      <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <img src={clothImagePreview} alt={selectedProduct.name} style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, border: '2px solid #0ea5e9', padding: 4 }} />
                        <Text style={{ display: 'block', marginTop: 8, color: textColor }}>✓ Dress pre-selected from product page</Text>
                      </div>
                    ) : (
                      <ImageUpload label="Upload Cloth Image" onImageChange={setClothImage} isDarkMode={isDarkMode} />
                    )}
                    <div className="mt-6 space-y-4">
                      <div><Text style={{ color: subText }}>Garment Type</Text>
                        <Select placeholder="Select garment type" style={{ width: "100%", marginTop: 4 }} value={garmentType} onChange={setGarmentType}>
                          <Option value="shirt">Shirt</Option><Option value="pants">Pants</Option><Option value="jacket">Jacket</Option>
                          <Option value="dress">Dress</Option><Option value="tshirt">T-shirt</Option>
                        </Select>
                      </div>
                      <div><Text style={{ color: subText }}>Style</Text>
                        <Select placeholder="Select style" style={{ width: "100%", marginTop: 4 }} value={style} onChange={setStyle}>
                          <Option value="casual">Casual</Option><Option value="formal">Formal</Option><Option value="streetwear">Streetwear</Option>
                          <Option value="traditional">Traditional</Option><Option value="sports">Sportswear</Option>
                        </Select>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <div style={{ marginTop: "2.5rem" }}>
                <Title level={5} style={{ color: textColor, marginBottom: "0.5rem" }}>Special Instructions</Title>
                <Input.TextArea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={4}
                  placeholder="e.g. Fit for walking pose, crop top, side view preferred..."
                  style={{ borderRadius: 10, padding: "1rem", fontSize: "1rem", backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff", color: textColor, borderColor: isDarkMode ? "#333" : "#d1d5db" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
                <Button type="primary" size="large" htmlType="submit" loading={loading} style={{ height: 48, width: 200, fontSize: 16, borderRadius: 8 }}>
                  {loading ? "Processing..." : "Try On"}
                </Button>
              </div>
            </form>

            {result && (
              <div ref={resultRef} className="mt-20">
                <Divider />
                <Title level={3} style={{ color: textColor, textAlign: "center", marginBottom: 32 }}>Your Try-On Result</Title>
                <div className="flex justify-center">
                  <img src={result.resultImage} alt="Try-On Result" style={{ borderRadius: 16, boxShadow: "0 10px 40px rgba(0,0,0,0.3)", maxHeight: 480 }} />
                </div>
                <Text style={{ display: "block", textAlign: "center", marginTop: 16, color: isDarkMode ? "#ffffff" : "#000000", fontSize: "1.25rem", fontWeight: "600" }}>
                  {result.text}
                </Text>
              </div>
            )}

            {history.length > 0 && (
              <div className="mt-24">
                <Divider /><Title level={3} style={{ color: textColor, marginBottom: 32 }}>Previous Results</Title>
                <Row gutter={[24, 24]}>
                  {history.map((item) => (
                    <Col xs={24} sm={12} md={8} key={item.id}>
                      <div style={{ background: cardColor, padding: 16, borderRadius: 12 }}>
                        <img src={item.resultImage} alt="Previous" style={{ width: "100%", borderRadius: 10, marginBottom: 12 }} />
                        <Text style={{ display: "block", color: isDarkMode ? "#ffffff" : "#000000", fontSize: "1.25rem", fontWeight: "600", marginBottom: 4 }}>
                          {item.text}
                        </Text>
                        <Text style={{ color: isDarkMode ? "#777" : "#666", fontSize: 12 }}>{item.timestamp}</Text>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </div>
        </Content>
        <Footer isDarkMode={isDarkMode} />
        <ToastContainer theme={isDarkMode ? "dark" : "light"} />
      </Layout>
    </ConfigProvider>
  );
}

export default TryOn; 