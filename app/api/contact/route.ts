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

    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: 'otu <onboarding@resend.dev>',
        to: 'otu.intelligence@gmail.com',
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      });
    } else {
      console.warn('RESEND_API_KEY not found. Email not sent.');
    }
    
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
