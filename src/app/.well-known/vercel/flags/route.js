import { NextResponse } from 'next/server';
import { verifyAccess } from '@vercel/flags';
 
export async function GET(request) {
  const access = await verifyAccess(request.headers.get('Authorization'));
  if (!access) return NextResponse.json(null, { status: 401 });
 
  return NextResponse.json({
    definitions: {
      newFeature: {
        description: 'Controls whether the new feature is visible',
        origin: 'https://st-post.vercel.app/#new-feature',
        options: [
          { value: false, label: 'Off' },
          { value: true, label: 'On' },
        ],
      },
    },
  });
}