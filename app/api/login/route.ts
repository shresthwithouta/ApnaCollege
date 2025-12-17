import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
const body = await req.json();
const { email, username, password } = body;


if (!email && !username) {
  return NextResponse.json(
    { error: "Email or Username is required" },
    { status: 400 }
  );
}


if (!password) {
  return NextResponse.json(
    { error: "Password is required" },
    { status: 400 }
  );
}



await connect();


const user = await User.findOne(
  email ? { email } : { username } // if entered email find user with that email or else if they entered username find user with that username 
);



if (!user) {
  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 }
  );
}

const passwordMatches = await bcrypt.compare(password, user.password) /* bcrypt.compare(plain, hashed pass); */

if (!passwordMatches) {
  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 }
  );
}

return NextResponse.json(
  {
    message: "Login successful",
    user: {
      id: user._id.toString(), // in mongo _id is an object but frontend/jwt prefers string
      username: user.username,
      email: user.email,
      name: user.name
    }
  },
  { status: 200 }
);

}
