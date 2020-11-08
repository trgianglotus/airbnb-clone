import * as sgMail from '@sendgrid/mail'

export const sendEmail = async (recipient: string, url: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
  const msg = {
    to: recipient,
    from: 'giang.nht6@gmail.com',
    subject: 'Confirm Email',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<html>
        <body>
        <p>Testing SparkPost - the world's most awesomest email service!</p>
        <a href="${url}">confirm email</a>
        </body>
        </html>`,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}
