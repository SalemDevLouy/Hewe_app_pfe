import { NextRequest, NextResponse } from 'next/server';
import { getAllTags } from '@/app/lib/db-utils';

export async function GET(request: NextRequest) {
  try {
    const tags = await getAllTags();

    return NextResponse.json({
      success: true,
      data: tags,
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
