export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const { name, lastname, phone, wilaya, product } = req.body;

  const message = `
👟 طلب جديد
👤 الاسم: ${name} ${lastname}
📍 الولاية: ${wilaya}
📞 الهاتف: ${phone}
🛒 المنتج: ${product}
  `;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
}