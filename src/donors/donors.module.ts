import { Module } from '@nestjs/common';
import { DonorsService } from './donors.service';
import { DonorsController } from './donors.controller';
import { Donor, DonorSchema } from './schemas/donor.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Donor.name, schema: DonorSchema }])],
  controllers: [DonorsController],
  providers: [DonorsService],
})
export class DonorsModule {}
