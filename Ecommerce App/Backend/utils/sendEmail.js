

const nodemailer = require("nodemailer");

const sendEmail =async (option)=> {
 
  
 console.log(option)

  const  transporter = nodemailer.createTransport({
    service:"gmail",
     host: "smtp.gmail.com",
     port: 465,
    //secure: true, // true for 465, false for other ports
    auth: {
      user:"dhananjaydhoke33@gmail.com", // generated ethereal user
      pass:"Dhananjay@123", // generated ethereal password
    },
  });

  // send mail with defined transport object
   await transporter.sendMail({
    from: 'dhananjaydhoke33@gmail.com', // sender address
    to: option.email, // list of receivers
    subject:option.subject, // Subject line
    text: option.text, // plain text body
   
  });

 
}

module.exports = sendEmail