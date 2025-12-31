import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { LogInDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(resgisterUserDto: RegisterDto) {
    // Logic for user register
    // 1. Check if email already exists or not
    // done using try and catch using nest inbuilt error handler

    // 2. hash the password
    const saltRounds = 10;
    const hash = await bcrypt.hash(resgisterUserDto.password, saltRounds);

    // 3. store the user into db
    const user = await this.userService.createUser({
      ...resgisterUserDto,
      password: hash,
    });

    // 4. generate jwt token
    const payload = { sub: user._id, email: user.email }
    const token = await this.jwtService.signAsync(payload)
    console.log(token);
    

    // 5. send token in response

    return token;
  }

  async loginUser(loginUserDto: LogInDto){
    // 1. Find the user by email
    const user = await this.userService.findOneByEmail(loginUserDto.email);

    // 2. If user doesn't exist, throw error
    if(!user){
      throw new UnauthorizedException('Invalid Credentials')
    }

    // 3. Compare the plain password with the hashed password
    const isMatch = bcrypt.compare(loginUserDto.password, user.password as unknown as string);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 4. Generate and return JWT token
    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
