import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, name, message } = data;

    if (!email || !name || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Connect to an email provider like Resend or SendGrid here!
    // Example using Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'otu.intelligence@gmail.com',
    //   subject: `New Contact Request from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    // });
    
    // For now, we will simulate success to ensure the frontend form completes!
    console.log(`[CONTACT SUBMISSION LOGGED]: 
Name: ${name}
Email: ${email}
Message: ${message}`);

    return NextResponse.json(
      { message: 'Successfully captured contact submission' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
