import bcrypt from 'bcrypt';

export class Password {
  static async hash(password: string){
    return await bcrypt.hash(password, 10);
  }

  static async compare(storedPassword: string, suppliedPassword: string){
    const match = await bcrypt.compare(suppliedPassword, storedPassword);
    if(match){
      return match
    }
    return null;
  }
}