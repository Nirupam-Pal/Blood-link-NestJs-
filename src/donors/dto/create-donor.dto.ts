import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDonorDto {
    @IsString() @IsNotEmpty()
    fname: string

    @IsString() @IsNotEmpty()
    lname: string

    @IsEmail() @IsNotEmpty()
    email: string

    @IsNumber() @IsNotEmpty()
    phone: number

    @IsString() @IsNotEmpty()
    blood_group: string
}
