import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Product } from "src/product/schemas/product.schema";

@Schema({
    collection: 'prices',
    timestamps: true
})

export class Price {
    @Prop({required: true})
    shop: string;

    @Prop()
    price: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: Product.name, required: true })
    productId: Types.ObjectId;

}

export const PriceSchema = SchemaFactory.createForClass(Price);