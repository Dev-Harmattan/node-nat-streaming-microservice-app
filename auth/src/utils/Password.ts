import bcrypt from 'bcryptjs';

export class Password {
  static async hash(password: string){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async compare(suppliedPassword: string, storedPassword : string){
    const match = await bcrypt.compare(suppliedPassword, storedPassword);
    if(match){
      return match
    }
    return null;
  }
}