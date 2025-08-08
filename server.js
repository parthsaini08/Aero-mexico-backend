require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "farmerjames786@gmail.com",
    pass: "smwp utic uhmq pdji",
  },
});

app.post('/send-email', async (req, res) => {
  const {
    from,
    to,
    departureDate,
    returnDate,
    tripType,
    travellers,
    name,
    phone,
    email
  } = req.body;

  const mailOptions = {
    from: `"Flight Booking Inquiry" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: '✈️ New Flight Booking Inquiry',
    html: `
      <h2>Flight Booking Details</h2>
      <ul>
        <li><strong>From:</strong> ${from}</li>
        <li><strong>To:</strong> ${to}</li>
        <li><strong>Trip Type:</strong> ${tripType}</li>
        <li><strong>Departure Date:</strong> ${departureDate}</li>
        ${returnDate ? `<li><strong>Return Date:</strong> ${returnDate}</li>` : ""}
        <li><strong>Travellers:</strong> ${travellers}</li>
      </ul>

      <h3>Passenger Contact Info</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
      </ul>
    `,
  };

  

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ success: false, error: 'Email sending failed' });
  }
});

app.post('/send-message', async (req, res) => {
  const { name, phone, email, message } = req.body;

  const mailOptions = {
    from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: '📬 New Contact Form Message',
    html: `
      <h3>Contact Form Message</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
      </ul>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Contact message sent successfully' });
  } catch (error) {
    console.error('Message send error:', error);
    res.status(500).json({ success: false, error: 'Failed to send contact message' });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
