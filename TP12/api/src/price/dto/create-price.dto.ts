import { IsString } from "class-validator";

export class CreatePriceDto {
    @IsString()
    readonly shop: string;

    @IsString()
    readonly price: string;

    @IsString()
    readonly productId: string;
}