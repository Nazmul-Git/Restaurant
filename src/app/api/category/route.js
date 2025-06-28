import connectDB from '@/app/lib/connectDB';
import Category from '@/app/models/CategorySchema';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({ isActive: true }).select('name description');
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Failed to fetch categories' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { name, description } = await request.json();

    // Validation
    if (!name || typeof name !== 'string') {
      return new Response(JSON.stringify({ error: 'Valid category name is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const normalizedName = name.trim().toLowerCase();
    
    // Check for existing category
    const existingCategory = await Category.findOne({ name: normalizedName });
    if (existingCategory) {
      return new Response(JSON.stringify({ error: 'Category already exists' }), {
        status: 409, 
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Create new category
    const newCategory = new Category({
      name: normalizedName,
      description: description?.trim()
    });

    await newCategory.save();
    
    return new Response(JSON.stringify(newCategory), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to create category' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}