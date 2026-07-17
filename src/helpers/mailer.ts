import nodemailer from 'nodemailer';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({email, emailType, UserId}:any) =>{
    try {
        const hashedToken = await bcrypt.hash(UserId.toString(), 10);
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(UserId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour
            });
        }else if (emailType === "RESET"){
            await User.findByIdAndUpdate(UserId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000 // 1 hour
            });
        }
        var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
        });
        // important method to retrieve data from the url
        // 1. after ? this method here we are using
        // 2. using like the [id] we have used
        const mailOptions = {
            from: "ds7081241904@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>`
        };
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    }catch(error:any){
        console.log("Error in sendEmail function: ", error.message);
    }
}
