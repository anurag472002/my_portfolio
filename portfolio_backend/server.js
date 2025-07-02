const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000; // or 3000, but keep it consistent

// Middleware
app.use(cors());
app.use(express.json());

// Your email credentials
const YOUR_EMAIL = 'anuragsingh82791@gmail.com';
const YOUR_APP_PASSWORD = 'your-app-password-here'; // 🔒 Replace with real app password

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: YOUR_EMAIL,
    pass: YOUR_APP_PASSWORD
  }
});

// Contact route
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    // Email to you
    await transporter.sendMail({
      from: YOUR_EMAIL,
      to: YOUR_EMAIL,
      subject: `Portfolio Contact from ${name}`,
      text: `You received a message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    // Auto-reply to visitor
    await transporter.sendMail({
      from: YOUR_EMAIL,
      to: email,
      subject: 'Thanks for contacting Anurag Singh!',
      text: `Hi ${name},\n\nThank you for reaching out! I’ll get back to you soon.\n\nBest regards,\nAnurag Singh`
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
