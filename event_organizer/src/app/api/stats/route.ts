import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This is mock data - replace with actual database query in production
    const stats = [
      {
        icon: "Calendar",
        value: "10K+",
        label: "Events Created"
      },
      {
        icon: "Users",
        value: "500K+",
        label: "Tickets Sold"
      },
      {
        icon: "MapPin",
        value: "50+",
        label: "Cities"
      },
      {
        icon: "CreditCard",
        value: "2.5%",
        label: "Processing Fee"
      }
    ];

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 