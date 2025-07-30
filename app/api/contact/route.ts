import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: "noreply@gebetasaccos.com",
      to: [process.env.ADMIN_EMAIL!],
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #16a34a 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e40af; margin-top: 0; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">Contact Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 100px;">Name:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${phone || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${subject}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #1e40af;">
              <h3 style="color: #1e40af; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6; color: #4b5563; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
            </div>
            
            <div style="margin-top: 25px; padding: 20px; background: #ecfdf5; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #059669; font-weight: bold; font-size: 16px;">
                📧 Reply to: <a href="mailto:${email}" style="color: #059669; text-decoration: none;">${email}</a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the Gebeta SACCOS contact form at ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    })

    // Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: "noreply@gebetasaccos.com",
      to: [email],
      subject: "Thank you for contacting Gebeta SACCOS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #16a34a 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank you for contacting us!</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
            <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">Dear ${name},</p>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              We have received your message and will get back to you within 24 hours. Our team is committed to providing you with the best possible service.
            </p>
            
            <div style="background: white; padding: 25px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #1e40af; margin-top: 0;">Your Message Summary:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 80px;">Subject:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; vertical-align: top;">Message:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${message.replace(/\n/g, "<br>")}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #059669; margin-top: 0;">What happens next?</h4>
              <ul style="color: #4b5563; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Our team will review your message</li>
                <li>You'll receive a response within 24 hours</li>
                <li>For urgent matters, call us at +251 11 123 4567</li>
              </ul>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">
              Best regards,<br>
              <strong>Gebeta SACCOS Team</strong>
            </p>
          </div>
          
          <div style="background: #1e40af; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px;">
              📞 +251 11 123 4567 | 📧 info@gebetasaccos.com | 🌐 www.gebetasaccos.com
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Gebeta SACCOS LTD. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    console.log("Admin email result:", adminEmailResult)
    console.log("User email result:", userEmailResult)

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! We'll get back to you within 24 hours.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        error: "Failed to send message. Please try again or contact us directly at +251 11 123 4567.",
      },
      { status: 500 },
    )
  }
}
