import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';

@Schema( {
  timestamps: true
})
export class User {

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop({
    unique: [true, 'Duplicate username entered']
  })
  username: string;

  @Prop({ unique: true, required: true})
  password: string;

  repeat_password: string;

  validatePassword() {
    if (this.password !== this.repeat_password) {
      throw new Error('Passwords do not match');
    }
  }

  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

}

export const UserSchema = SchemaFactory.createForClass(User);