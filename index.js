const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
require('dotenv').config();

const HOST = process.env.HOST || 'smtp.mail.ru'
const APP_PORT = process.env.APP_PORT || 4000
const MAIL_PORT = process.env.MAIL_PORT || 465
const MAIL_USER = process.env.MAIL_USER
const MAIL_PASS = process.env.MAIL_PASS

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// http://localhost:3003/send?email=nikita.keyn@yandex.ru&phone=71299219&name=Nikita
app.get('/send', (req, res) => {
  try {
    const {email, phone, name} = req.query;

    (async () => {
      let transporter = nodemailer.createTransport({
        host: HOST,
        port: MAIL_PORT,
        secure: true,
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS,
        },
      });

      let result = await transporter.sendMail({
        from: `"Заявка" <${MAIL_USER}>`,
        to: email,
        subject: 'Новая заявка',
        html: `<h3 style="text-align: center;">Телефон: ${phone}</h3><h3 style="text-align: center;">Имя: ${name}</h3>`,
      });

      console.log(result);
    })();

    res.send('ok')
  } catch (e) {
    console.log(e);
    res.send('error')
  }
})

app.listen(APP_PORT, () => {
  console.log(`Server listening on port ${APP_PORT}`)
})