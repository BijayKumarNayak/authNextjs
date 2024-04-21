import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken =await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9feabc160990ad",
        pass: "bf73050496dbf2"
      }
    });

    const emailOption = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset Password", // Subject line

      html: `<p>Click  <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" >here </a> to ${emailType === "VERIFY" ?"Verify your email":"Reset your password"} or copy paste the link bellow in your browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}  </p>`, // html body
    };

    const emailResponce = await transport.sendMail(emailOption);
    return emailResponce;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
