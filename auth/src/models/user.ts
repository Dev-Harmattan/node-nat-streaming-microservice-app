import mongoose, {Schema} from 'mongoose';
import {Password} from '../utils/Password';

//Inteface for user model attributes properties
interface UserAttrs {
  email: string;
  password: string;
}

//Interface that describes the properties of the User model
interface UserModel extends mongoose.Model<UserDoc>{
  build(attrs: UserAttrs): UserDoc;
}

//Interface that describe the properties of the User documents
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}


const userSchema = new Schema({
  email: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  }
});

userSchema.pre('save', async function(done) {
  if(this.isModified('password')){
    const hashPassword = await Password.hash(this.get('password'));
    this.set('password', hashPassword);
  }
  done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export {User}
