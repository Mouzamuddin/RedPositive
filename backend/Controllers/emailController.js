const nodemailer = require('nodemailer');
const multer = require('multer');



const upload = multer();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mouzam.testing@gmail.com',
    pass: 'jjca lnfd kwwk mpbp'
  }
});

const sendEmail = async (req, res) => {
  try {

    const emailData = req.body.users;
    if (!emailData || emailData.length === 0) {
      return res.status(400).json({ error: 'No user data found in request body' });
    }

    const userArray = Array.isArray(emailData) ? emailData : [emailData];

    const userData = emailData.map(user => JSON.parse(user));
    const userDataString = JSON.stringify(userData, null, 2);

    const mailOptions = {
      from: 'mouzam.testing@gmail.com',
      to: 'mouzamzuhair@gmail.com',
      subject: 'Selected Users',
      html: `
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>Here are the selected users:</h2>
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Hobbies</th>
            </tr>
            ${userData.map(user => `
              <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber}</td>
                <td>${user.hobbies}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>`

    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = {
  sendEmail
};
