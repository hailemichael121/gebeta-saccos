import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const { email, password, firstName, lastName, phone, dateOfBirth, address, city, occupation, monthlyIncome } =
      formData

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 })
    }

    const supabase = createClient()

    // Create user account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone,
          date_of_birth: dateOfBirth,
          address,
          city,
          occupation,
          monthly_income: monthlyIncome,
        },
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Send registration notification to admin
    await resend.emails.send({
      from: "noreply@gebetasaccos.com",
      to: [process.env.ADMIN_EMAIL!],
      subject: "New Member Registration",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">
            New Member Registration
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Member Details</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Date of Birth:</strong> ${dateOfBirth}</p>
            <p><strong>Address:</strong> ${address}, ${city}</p>
            <p><strong>Occupation:</strong> ${occupation}</p>
            <p><strong>Monthly Income:</strong> ${monthlyIncome ? `${monthlyIncome} Birr` : "Not provided"}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #ecfdf5; border-radius: 8px;">
            <p style="margin: 0; color: #059669; font-weight: bold;">
              📧 Member Email: ${email}
            </p>
          </div>
        </div>
      `,
    })

    // Send welcome email to user
    await resend.emails.send({
      from: "noreply@gebetasaccos.com",
      to: [email],
      subject: "Welcome to Gebeta SACCOS!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Welcome to Gebeta SACCOS!</h2>
          
          <p>Dear ${firstName},</p>
          
          <p>Thank you for joining Gebeta SACCOS! Your registration has been received and is being processed.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>What's Next?</h3>
            <ul>
              <li>Your account will be activated within 24 hours</li>
              <li>You'll receive a confirmation email once approved</li>
              <li>Visit any of our branches with required documents</li>
              <li>Start enjoying our financial services</li>
            </ul>
          </div>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          Gebeta SACCOS Team</p>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #1e40af; color: white; border-radius: 8px; text-align: center;">
            <p style="margin: 0;">📞 +251 11 123 4567 | 📧 info@gebetasaccos.com</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({
      message: "Registration successful",
      user: authData.user,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
