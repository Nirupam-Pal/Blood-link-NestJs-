import { PartialType } from '@nestjs/mapped-types';
import { CreateDonorDto } from './create-donor.dto';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDonorDto extends PartialType(CreateDonorDto) {
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
