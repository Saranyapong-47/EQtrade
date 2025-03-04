import mongoose,{Schema} from "mongoose";   

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: false,
            default: "user"
        }
    },
    { timestamps: true }
)

const User = mongoose.model.User || mongoose.model("user", userSchema);
export default User;