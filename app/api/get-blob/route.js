import { list } from '@vercel/blob';
 
export async function GET(request) {
  const { blobs } = await list();
  return Response.json(blobs);
}