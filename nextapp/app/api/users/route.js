import { connectMongoDB } from "@/mongodb";
import User from "@/models/User";



export async function GET(request) {
    await connectMongoDB();
  
    try {
      const users = await User.find({});
      return new Response(JSON.stringify({ success: true, data: users }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ success: false }), { status: 400 });
    }
  }
  
  export async function POST(request) {
    await connectMongoDB();
  
    const body = await request.json();
  
    try {
      const user = await User.create(body);
      return new Response(JSON.stringify({ success: true, data: user }), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
    }
  }
