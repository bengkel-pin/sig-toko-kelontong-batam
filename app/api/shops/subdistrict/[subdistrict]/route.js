// app/api/shops/subdistrict/[subdistrict]/route.js

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// GET /shops/subdistrict/:subdistrict
export async function GET(req, { params }) {
  const { subdistrict } = params;
  
  // Get the path to the data.json file
  const filePath = path.join(process.cwd(), 'data', 'toko.json');
  
  // Read the file asynchronously
  const jsonData = await fs.readFile(filePath, 'utf-8');
  
  // Parse the JSON data
  const shops = JSON.parse(jsonData);
  
  // Filter the shops by the requested subdistrict (case-insensitive)
  const filteredShops = shops.filter(shop => shop.subdistrict.toLowerCase() === subdistrict.toLowerCase());

  // If no shops found, return a 404 status with a message
  if (filteredShops.length === 0) {
    return NextResponse.json({ message: `No shops found in subdistrict: ${subdistrict}` }, { status: 404 });
  }

  // Return the filtered shops
  return NextResponse.json(filteredShops);
}
