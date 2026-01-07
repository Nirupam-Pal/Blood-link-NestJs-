import { Injectable } from '@nestjs/common';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Donor } from './schemas/donor.schema';
import { Model } from 'mongoose';

@Injectable()
export class DonorsService {
  constructor(@InjectModel(Donor.name) private donorModel: Model<Donor>) {}

  async create(createDonorDto: CreateDonorDto) {
    return await this.donorModel.create({
      fname: createDonorDto.fname,
      lname: createDonorDto.lname,
      email: createDonorDto.email,
      phone: createDonorDto.phone,
      blood_group: createDonorDto.blood_group,
    })
  }

  async findAll() {
    return await this.donorModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} donor`;
  }

  update(id: number, updateDonorDto: UpdateDonorDto) {
    return `This action updates a #${id} donor`;
  }

  remove(id: number) {
    return `This action removes a #${id} donor`;
  }
}
