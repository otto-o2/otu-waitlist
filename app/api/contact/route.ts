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

    const loopsApiKey = process.env.LOOPS_API_KEY;
    const transactionalId = process.env.LOOPS_CONTACT_TRANSACTIONAL_ID;

    if (loopsApiKey && transactionalId) {
      try {
        await fetch("https://app.loops.so/api/v1/transactional", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loopsApiKey}`,
          },
          body: JSON.stringify({
            email: "otu.intelligence@gmail.com",
            transactionalId: transactionalId,
            addToAudience: true,
            dataVariables: {
              name,
              senderEmail: email,
              message,
            },
          }),
        });
      } catch (error) {
        console.error('Error sending email through Loops:', error);
      }
    } else {
      console.warn('LOOPS_API_KEY or LOOPS_CONTACT_TRANSACTIONAL_ID not found. Email not sent.');
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
