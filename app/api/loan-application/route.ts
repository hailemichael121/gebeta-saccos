import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      nationalId,
      address,
      city,
      loanType,
      loanAmount,
      loanPurpose,
      repaymentPeriod,
      employmentStatus,
      employer,
      monthlyIncome,
      workExperience,
      hasCollateral,
      collateralDescription,
      additionalNotes,
    } = body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !loanType ||
      !loanAmount
    ) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const loanTypeLabels: { [key: string]: string } = {
      personal: "Personal Loan",
      business: "Business Loan",
      home: "Home Loan",
      vehicle: "Vehicle Loan",
      education: "Education Loan",
    };

    const formattedAmount = Number.parseInt(loanAmount).toLocaleString();
    const applicationId = `LA-${Date.now()}`;

    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: "noreply@gebetasaccos.com",
      to: process.env.ADMIN_EMAIL!,
      subject: `Loan Application: ${loanTypeLabels[loanType]} - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #16a34a 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Loan Application Received</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
            <div style="background: linear-gradient(135deg, #dbeafe 0%, #dcfce7 100%); padding: 25px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
              <h2 style="color: #1e40af; margin: 0 0 10px 0; font-size: 24px;">${loanTypeLabels[loanType]} Application</h2>
              <div style="font-size: 32px; font-weight: bold; color: #059669; margin: 15px 0;">
                ${formattedAmount} Birr
              </div>
              <div style="color: #6b7280; font-size: 14px;">Application ID: ${applicationId}</div>
            </div>

            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #1e40af; margin-top: 0; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">Applicant Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 150px;">Full Name:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Date of Birth:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${dateOfBirth || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">National ID:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${nationalId || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Address:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${address || "Not provided"}, ${city || ""}</td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #1e40af; margin-top: 0; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">Loan Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 150px;">Loan Type:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${loanTypeLabels[loanType]}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Loan Amount:</td>
                  <td style="padding: 8px 0; color: #4b5563; font-weight: bold;">${formattedAmount} Birr</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Purpose:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${loanPurpose || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Repayment Period:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${repaymentPeriod || "Not specified"}</td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #1e40af; margin-top: 0; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">Employment Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 150px;">Employment Status:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${employmentStatus || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Employer:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${employer || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Monthly Income:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${monthlyIncome || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Work Experience:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${workExperience || "Not provided"}</td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #1e40af; margin-top: 0; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">Collateral Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 150px;">Has Collateral:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${hasCollateral ? "Yes" : "No"}</td>
                </tr>
                ${
                  hasCollateral
                    ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Description:</td>
                  <td style="padding: 8px 0; color: #4b5563;">${collateralDescription || "Not provided"}</td>
                </tr>
                `
                    : ""
                }
              </table>
            </div>

            ${
              additionalNotes
                ? `
            <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #1e40af;">
              <h3 style="color: #1e40af; margin-top: 0;">Additional Notes</h3>
              <p style="color: #4b5563; line-height: 1.6; margin: 0;">${additionalNotes.replace(/\n/g, "<br>")}</p>
            </div>
            `
                : ""
            }
            
            <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; margin-top: 25px; text-align: center;">
              <p style="margin: 0; color: #059669; font-weight: bold; font-size: 16px;">
                📧 Applicant Email: <a href="mailto:${email}" style="color: #059669; text-decoration: none;">${email}</a>
              </p>
              <p style="margin: 10px 0 0 0; color: #059669; font-size: 14px;">
                📞 Phone: ${phone}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>This loan application was submitted on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to applicant
    const userEmailResult = await resend.emails.send({
      from: "noreply@gebetasaccos.com",
      to: email,
      subject: `Loan Application Received - ${loanTypeLabels[loanType]}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #16a34a 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Loan Application Confirmation</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
            <div style="background: linear-gradient(135deg, #dbeafe 0%, #dcfce7 100%); padding: 25px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
              <h2 style="color: #1e40af; margin: 0 0 10px 0; font-size: 24px;">${loanTypeLabels[loanType]} Application Received</h2>
              <div style="font-size: 32px; font-weight: bold; color: #059669; margin: 15px 0;">
                ${formattedAmount} Birr
              </div>
              <div style="color: #6b7280; font-size: 14px;">Application ID: ${applicationId}</div>
            </div>

            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="color: #4b5563; line-height: 1.6; margin: 0;">
                Dear ${firstName} ${lastName},
              </p>
              <p style="color: #4b5563; line-height: 1.6; margin: 0;">
                Thank you for submitting your loan application. We have received your application and it is currently under review.
              </p>
              <p style="color: #4b5563; line-height: 1.6; margin: 0;">
                We will notify you of the status of your application as soon as possible.
              </p>
            </div>
            
            <div style="background: #ecfdf5; padding: 25px; border-radius: 8px; margin-top: 25px; text-align: center;">
              <p style="margin: 0; color: #059669; font-weight: bold; font-size: 16px;">
                📧 You submitted your application with the email: <a href="mailto:${email}" style="color: #059669; text-decoration: none;">${email}</a>
              </p>
              <p style="margin: 10px 0 0 0; color: #059669; font-size: 14px;">
                📞 And phone number: ${phone}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>This email confirms that your loan application was submitted on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    // Check if emails were sent successfully
    if (adminEmailResult.error || userEmailResult.error) {
      console.error(
        "Email sending failed:",
        adminEmailResult.error || userEmailResult.error
      );
      return NextResponse.json(
        {
          error: "Failed to send confirmation emails",
          details: adminEmailResult.error || userEmailResult.error,
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Loan application submitted successfully",
        applicationId,
        emailConfirmation: {
          toAdmin: adminEmailResult.data?.id ? "sent" : "failed",
          toUser: userEmailResult.data?.id ? "sent" : "failed",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing loan application:", error);
    return NextResponse.json(
      {
        error: "Failed to process loan application",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
