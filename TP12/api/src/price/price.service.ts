import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Price } from './schemas/price.schema';
import { Model } from 'mongoose';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PriceService {
    constructor(
        @InjectModel(Price.name)
        private priceModel: Model<Price>
    ) {}

    async create( price: CreatePriceDto ): Promise<{ price?: Price; status?: boolean; message?: string, error?: any }> {
        try {
            const newPrice = await this.priceModel.create(price);

            return {
                status: true,
                price: newPrice
            };
        } catch (error){
            return {
                status: false,
                error: error
            }
        }
    }

    async findAll(): Promise<Price[]> {
        return this.priceModel.find().exec();
    }

    async findById(id: string): Promise<Price> {
        const price = await this.priceModel.findById(id).exec();
        if (!price) {
          throw new NotFoundException(`Price with this ID (${id}) not found.`);
        }
        return price;
    }

    async updateById(Price: UpdatePriceDto): Promise<Price> {
        const {id, shop, price, productId } = Price;
        const updatePrice =  await this.priceModel.findByIdAndUpdate(id, { shop, price, productId }, {
          new: true
        });
        return updatePrice;
    }

    async deleteById(id: string): Promise<{ status?: boolean; message?: string }> {
        await this.priceModel.findByIdAndDelete(id);
        return {
            status: true,
            message: "Category deleted successfully."
        }
    }
}
