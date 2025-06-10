import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This is a mock authentication check
    // In production, you would check the session/token here
    const isAuthenticated = false; // Replace with actual auth check

    return NextResponse.json({ authenticated: isAuthenticated });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check authentication' },
      { status: 500 }
    );
  }
} 