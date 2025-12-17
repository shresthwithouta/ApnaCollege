import { Schema, model,models } from "mongoose";

const userSchema = new Schema ({
    
    username: {
        type: String,
        required: [true,"Username is required!"],
        unique: true,
        lowercase: true,
        trim:true
    },
    tokenVersion: {
  type: Number,
  default: 0,
},
gifAllowed: {
  type: Boolean,
  default: false,
},
    tags: [
  {
    type: Schema.Types.ObjectId,
    ref: "Tag",
  },
],
    role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},
    email: {
        type: String,
        required: [true,"Email is required!"],
        unique: true,
        lowercase: true,
        trim:true
    },
    name: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: [true,"Password is required!"],
    },
    image: {
        type: String,
        default:""
    },
    bio: {
        type: String,
        default:""
    },
    banner: {
  type: String,
  default: "",
},

profileCompleted: {
  type: Boolean,
  default: false,
},
},{timestamps: true})

// if user exist thru model.User search then its okay otherwise create new user by model
const User = models.User || model("User", userSchema)
export default User;