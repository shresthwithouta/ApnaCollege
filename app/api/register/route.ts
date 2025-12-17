import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


// we check if api call is authentic and not incorrect
export async function POST(req: Request) {
const body = await req.json();

// creating method like body.username,body.email
const { username, email, name, password } = body;

//we check if username and all fields entered if one of en wont entered then it returns error
if (!username || !email || !password) {
  return NextResponse.json(
    { error: "All fields are required" },
    { status: 400 }
  );
}

// if there is no error then we connect db cuz its expensive
await connect();


// now we check if user or email already exists

const existingUser = await User.findOne({

    // Find a user where email matches OR username matches
  $or: [{ email }, { username }]
});

if (existingUser) {
  return NextResponse.json(
    { error: "User already exists" },
    { status: 409 }
  );
}

// now we hash the pass given by user

const hashedPassword = await bcrypt.hash(password, 10);


const user = await User.create({ // never send "user" in frontend..
  username,
  email,
  name: username, // default
  profileCompleted: false,
  password: hashedPassword
});

// user finally registered

return NextResponse.json(
  {
    message: "User registered successfully",
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      name: user.name
    }
  },
  { status: 201 }
);

}

