import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import Food from '@/app/models/FoodSchema';
import connectDB from '@/app/lib/connectDB';

// Constants for configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Helper function to validate image
const validateImage = (image) => {
  if (!ALLOWED_FILE_TYPES.includes(image.type)) {
    throw new Error('Only JPEG, PNG, and WebP images are allowed');
  }
  if (image.size > MAX_FILE_SIZE) {
    throw new Error('Image size must be less than 5MB');
  }
};

export async function POST(request) {
  let filename = null;
  
  try {
    // Connect to database first
    await connectDB()
    
    const formData = await request.formData();
    
    // Get and validate form data
    const name = formData.get('name')?.toString().trim();
    const category = formData.get('category')?.toString().trim();
    const price = parseFloat(formData.get('price'));
    const description = formData.get('description')?.toString().trim() || '';
    const image = formData.get('image');

    // Validate required fields
    if (!name || !category || isNaN(price) || !image) {
      return NextResponse.json(
        { error: 'Name, category, price, and image are required' },
        { status: 400 }
      );
    }

    // Validate image
    validateImage(image);

    // Handle image upload
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const ext = path.extname(image.name);
    filename = `${timestamp}${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);
    await fs.promises.mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(filePath, buffer);

    const newFood = await Food.create({
      name,
      category,
      price,
      description,
      image: {
        fileName: filename,
        filePath: `/uploads/${filename}`
      }
    });

    return NextResponse.json(newFood, { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    if (filename) {
      try {
        await unlink(path.join(UPLOAD_DIR, filename));
      } catch (cleanupError) {
        console.error('Failed to clean up uploaded file:', cleanupError);
      }
    }

    console.error('API Error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { 
        status: error.name === 'ValidationError' ? 400 : 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const foods = await Food.find().sort({ createdAt: -1 }).lean();
    
    return NextResponse.json(foods, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch food items',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}