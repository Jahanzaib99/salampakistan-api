'use strict';

const config = require('../config');
const apiKey = config.get('sendgrid.apiKey');
const sgMail = require('@sendgrid/mail');
// const templates = require('../templates');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(apiKey);

module.exports = {
  sendEmail
};

function sendEmail(toAddress, subject, text, html) {
  return sgMail
    .send({
      to: toAddress, // Change to your recipient
      from: 'no_reply@ptdc.com', // Change to your verified sender
      subject: subject,
      text: text,
      html: html
    })
    .then((res) => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
}
