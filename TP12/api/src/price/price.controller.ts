import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Price } from './schemas/price.schema';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Controller('price')
export class PriceController {
    constructor(private priceService: PriceService) {}

    @Post('/add')
    async createPrice(@Body() Price: CreatePriceDto) {
        return await this.priceService.create(Price);
    }

    @Get('/all')
    async getAllPrice(): Promise<Price[]> {
        return this.priceService.findAll();
    }

    @Get('/id')
    async getPrice(@Body('id') id: string): Promise<Price> {
        return this.priceService.findById(id);
    }

    @Put('/update')
    async updatePrice(
        @Body() price: UpdatePriceDto
    ): Promise<Price> {
        return this.priceService.updateById(price);
    }

    @Delete('/delete')
    async deletePrice(@Body('id') id: string): Promise<{ status?: boolean; message?: string }> {
        return this.priceService.deleteById(id);
    }
}

