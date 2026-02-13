import nodemailer from 'nodemailer';

export async function sendContactEmail({
  name,
  contact,
  inquiryType,
  message,
}: {
  name: string;
  contact: string;
  inquiryType: string;
  message: string;
}) {
  try {
    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('❌ Email credentials not configured in environment variables');
      return { 
        success: false, 
        error: 'Email service not configured' 
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify transporter configuration
    await transporter.verify();
    console.log('✅ Email transporter verified successfully');

    // Email to yourself (company email)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `🔔 New ${inquiryType} from Sumnex Tech Website`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
              .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
              .label { font-weight: bold; color: #667eea; }
              .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🎉 New Contact Form Submission</h2>
                <p>From: Sumnex Tech Portfolio Website</p>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">👤 Name:</span><br/>
                  ${name}
                </div>
                <div class="field">
                  <span class="label">📱 Contact Number:</span><br/>
                  ${contact}
                </div>
                <div class="field">
                  <span class="label">📋 Inquiry Type:</span><br/>
                  ${inquiryType}
                </div>
                <div class="field">
                  <span class="label">💬 Message:</span><br/>
                  ${message.replace(/\n/g, '<br/>')}
                </div>
                <div class="field">
                  <span class="label">🕐 Submitted:</span><br/>
                  ${new Date().toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              <div class="footer">
                <p>This is an automated message from your Sumnex Tech contact form.</p>
                <p>Reply to this email to respond to the inquiry.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);

    return { 
      success: true,
      messageId: info.messageId 
    };

  } catch (error: any) {
    console.error('❌ Error sending email:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Unknown error';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Check your email credentials.';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Network error. Check your internet connection.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return { 
      success: false, 
      error: errorMessage 
    };
  }
}