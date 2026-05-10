import { useState } from "react";

function App() {
  const products = [
    {
      id: 1,
      name: "Nike Air Max",
      price: "12000 DA",
      img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    },
    {
      id: 2,
      name: "Adidas Run",
      price: "9500 DA",
      img: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
    },
    {
      id: 3,
      name: "Puma Sport",
      price: "8000 DA",
      img: "https://images.pexels.com/photos/19090/pexels-photo.jpg",
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    wilaya: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🚀 إرسال الطلب إلى API (نفس الكود القديم الذي يعمل)
  const sendOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          lastname: form.lastname,
          wilaya: form.wilaya,
          phone: form.phone,
          product: selectedProduct.name,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ تم إرسال الطلب بنجاح!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ حدث خطأ في الإرسال");
      }
    } catch (error) {
      setMessage("❌ مشكلة في الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  // 🛒 عند تأكيد الطلب (نفس الكود القديم)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendOrder();
    setSelectedProduct(null);
    setForm({
      name: "",
      lastname: "",
      wilaya: "",
      phone: "",
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <span style={styles.titleIcon}>👟</span> 
          متجر الأحذية الرياضية
        </h1>
        <p style={styles.subtitle}>أحدث التشكيلات بأفضل الأسعار</p>
      </div>

      {message && (
        <div style={message.includes("✅") ? styles.successMessage : styles.errorMessage}>
          {message}
        </div>
      )}

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <img src={p.img} alt={p.name} style={styles.image} />
            <div style={styles.cardContent}>
              <h3 style={styles.productName}>{p.name}</h3>
              <p style={styles.currentPrice}>{p.price}</p>
              <button
                style={styles.button}
                onClick={() => setSelectedProduct(p)}
              >
                شراء الآن 🛒
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* نافذة الطلب - نفس الشكل القديم مع تصميم جديد */}
      {selectedProduct && (
        <div style={styles.modal} onClick={() => setSelectedProduct(null)}>
          <form 
            onSubmit={handleSubmit} 
            style={styles.form}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>طلب: {selectedProduct.name}</h3>
              <button 
                style={styles.closeButton}
                onClick={() => setSelectedProduct(null)}
                type="button"
              >
                ✕
              </button>
            </div>

            <input
              style={styles.input}
              placeholder="الاسم"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              style={styles.input}
              placeholder="اللقب"
              value={form.lastname}
              onChange={(e) => setForm({ ...form, lastname: e.target.value })}
              required
            />

            <input
              style={styles.input}
              placeholder="الولاية"
              value={form.wilaya}
              onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
              required
            />

            <input
              style={styles.input}
              placeholder="رقم الهاتف"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />

            <div style={styles.modalButtons}>
              <button type="submit" style={styles.confirmButton} disabled={loading}>
                {loading ? "جاري الإرسال..." : "تأكيد الطلب"}
              </button>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={() => setSelectedProduct(null)}
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// 🎨 تصميم جديد مع الحفاظ على نفس طريقة العمل
const styles = {
  container: {
    fontFamily: "'Cairo', 'Tajawal', 'Arial', sans-serif",
    textAlign: "center",
    padding: "20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "40px",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
  },
  title: {
    fontSize: "2.5rem",
    color: "white",
    marginBottom: "10px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  },
  titleIcon: {
    marginLeft: "10px",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "1.1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    justifyContent: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  cardContent: {
    padding: "20px",
  },
  productName: {
    fontSize: "1.3rem",
    color: "#333",
    marginBottom: "10px",
  },
  currentPrice: {
    fontSize: "1.2rem",
    color: "#667eea",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  form: {
    background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
    padding: "30px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  modalTitle: {
    fontSize: "1.5rem",
    color: "#333",
    margin: 0,
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#999",
  },
  input: {
    padding: "12px",
    fontSize: "1rem",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    outline: "none",
    fontFamily: "inherit",
  },
  modalButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  confirmButton: {
    flex: 1,
    padding: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  cancelButton: {
    flex: 1,
    padding: "12px",
    background: "#f0f0f0",
    color: "#666",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  successMessage: {
    background: "#4caf50",
    color: "white",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "20px",
    maxWidth: "400px",
    margin: "0 auto 20px auto",
  },
  errorMessage: {
    background: "#f44336",
    color: "white",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "20px",
    maxWidth: "400px",
    margin: "0 auto 20px auto",
  },
};

// إضافة تأثيرات CSS
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  div[style*="card"]:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
  
  div[style*="card"]:hover img {
    transform: scale(1.05);
  }
  
  button[type="submit"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
  
  input:focus {
    border-color: #667eea !important;
  }
`;
document.head.appendChild(styleSheet);

export default App;