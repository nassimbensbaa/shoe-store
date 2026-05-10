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
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
>>>>>>> ecf7ed374b11804e17557b5801e74eef999be733
>>>>>>> fddae2a80adb73acb37d005fa9a665a299d72f46
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    wilaya: "",
    phone: "",
  });
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
>>>>>>> ecf7ed374b11804e17557b5801e74eef999be733
>>>>>>> fddae2a80adb73acb37d005fa9a665a299d72f46
  const [message, setMessage] = useState("");

  // 🚀 إرسال الطلب إلى API (آمن)
  const sendOrder = async () => {
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
      } else {
        setMessage("❌ حدث خطأ في الإرسال");
      }
    } catch (error) {
      setMessage("❌ مشكلة في الاتصال بالسيرفر");
    }
  };

  // 🛒 عند تأكيد الطلب
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
      <h1 style={styles.title}>👟 متجر الأحذية</h1>

      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <img src={p.img} alt={p.name} style={styles.image} />
            <h3>{p.name}</h3>
            <p>{p.price}</p>

            <button
              style={styles.button}
              onClick={() => setSelectedProduct(p)}
            >
              شراء الآن
            </button>
          </div>
        ))}
      </div>

      {/* نافذة الطلب */}
      {selectedProduct && (
        <div style={styles.modal}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h3>طلب: {selectedProduct.name}</h3>

            <input
              placeholder="الاسم"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              placeholder="اللقب"
              value={form.lastname}
              onChange={(e) =>
                setForm({ ...form, lastname: e.target.value })
              }
              required
            />

            <input
              placeholder="الولاية"
              value={form.wilaya}
              onChange={(e) =>
                setForm({ ...form, wilaya: e.target.value })
              }
              required
            />

            <input
              placeholder="رقم الهاتف"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              required
            />

            <button type="submit">تأكيد الطلب</button>
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
            >
              إلغاء
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// 🎨 تصميم
const styles = {
  container: {
    fontFamily: "Arial",
    textAlign: "center",
    padding: 20,
    background: "#f5f5f5",
    minHeight: "100vh",
  },
  title: {
    marginBottom: 20,
  },
  grid: {
    display: "flex",
    gap: 20,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    width: 220,
    background: "white",
    borderRadius: 12,
    padding: 15,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    padding: "8px 12px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: 6,
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: 300,
  },
  message: {
    color: "green",
    fontWeight: "bold",
  },
};

export default App;