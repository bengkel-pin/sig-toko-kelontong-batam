import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';


// GET /shops
export async function GET() {

    // Get the absolute path to the data.json file
  const filePath = path.join(process.cwd(), 'data', 'toko.json');
  
  // Read the file asynchronously
  const jsonData = await fs.readFile(filePath, 'utf-8');
  
  // Parse the JSON data
  const shops = JSON.parse(jsonData);

    // Return the list of shops in JSON format
    return NextResponse.json(shops);
  }