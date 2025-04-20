import mongoose, {Schema , model , models, mongo} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser{
    _id?:mongoose.Types.ObjectId,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const userSchema = new Schema<IUser>({
    email:{required:true, type:String,unique:true},
    password:{required:true, type:String},
 },
  {
    timestamps:true
  }
)
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  const User = models?.User || model<IUser>("User", userSchema);
  
  export default User;