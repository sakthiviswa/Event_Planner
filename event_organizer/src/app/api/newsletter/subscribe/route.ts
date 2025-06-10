import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Validate the email
    // 2. Store it in your database
    // 3. Add to your newsletter service (e.g., Mailchimp)

    return NextResponse.json({ 
      success: true,
      message: 'Successfully subscribed to newsletter'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
} 