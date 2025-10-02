import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
    try {
        // Transporter configuration
        const transporter = nodemailer.createTransport({
            // host: process.env.EMAIL_HOST || "sabeehrajput6gmail.com",
            // port: process.env.EMAIL_PORT || 587,
            // secure: false, // true for 465, false for other ports
            service:"gmail",
            auth: {
                user: process.env.EMAIL_USER ,
                pass: process.env.EMAIL_PASS ,
            }
        });

        // Verify transporter
        await transporter.verify();

        // Send email
        const info = await transporter.sendMail({
            from: `"Opna Mart" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });

        console.log("Email sent: %s", info.messageId);
        return info;

    } catch (error) {
        console.error("Email sending failed:", error.message);
        throw error;
    }
};