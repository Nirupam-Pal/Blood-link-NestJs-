import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

export class RegisterDto{
    @IsString() @IsNotEmpty()
    fname: string;

    @IsString() @IsNotEmpty()
    lname: string;

    @IsEmail() @IsNotEmpty()
    email: string;

    @IsNotEmpty() 
    password: string;
}