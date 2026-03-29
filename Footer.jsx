import { Typography } from "antd";

const { Text } = Typography;

const Footer = ({ isDarkMode }) => {
  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a1f0a 100%)',
        padding: "2rem 1rem",
        textAlign: "center",
        marginTop: "4rem",
        borderTop: "3px solid #FFD700",
        boxShadow: '0 -5px 20px rgba(255, 215, 0, 0.2)'
      }}
    >
      <Text style={{ color: '#FFD700', fontSize: 18, fontWeight: 500 }}>
        🙏 Thank You for Choosing JON BOUTIQUE
      </Text>
      <div style={{ marginTop: "1rem" }}>
        <Text style={{ color: '#FFF3B0', fontSize: 14, display: "block" }}>
          Virtual Try-On Experience | Fashion AI
        </Text>
        <Text style={{ color: '#B8860B', fontSize: 12, display: "block", marginTop: "0.5rem" }}>
          ✦ © {new Date().getFullYear()} JON BOUTIQUE. All rights reserved. ✦
        </Text>
      </div>
    </footer>
  );
};

export default Footer;