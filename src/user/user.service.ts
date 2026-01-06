import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (err) {
      console.log(err);

      const DUPLICATE_KEY_CODE = 11000;

      if (err.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException('User already exists');
      }

      throw err;
    }
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email }).select('+password').exec();
  }

  async getUserById(id: string) {
    return await this.userModel.findOne({ _id: id }).exec();
  }
}
