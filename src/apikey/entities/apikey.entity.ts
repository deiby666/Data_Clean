import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Apikey {
    
    @Prop({ required:true })
    apikey: string;
}

export const apikeySchema = SchemaFactory.createForClass(Apikey);