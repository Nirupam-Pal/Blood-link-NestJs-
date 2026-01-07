import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DonorDocument = HydratedDocument<Donor>;

@Schema()
export class Donor {
    @Prop({ required: true })
    fname : string

    @Prop({ required: true })
    lname : string

    @Prop({ required: true })
    email : string

    @Prop({ required: true})
    phone : number

    @Prop({ required: true })
    blood_group : string
}

export const DonorSchema = SchemaFactory.createForClass(Donor)