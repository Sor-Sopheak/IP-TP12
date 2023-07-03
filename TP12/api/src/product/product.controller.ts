import { Body, Controller, Get, Post,Delete, Put, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor( private productService: ProductService ) {

    }

    @Post('/add')
        async createProduct(@Body() product:CreateProductDto  ) {
            return await this.productService.create(product);
        }

    @Get('/all')
    async getAllProduct() {
        // return this.productService.findAll();
        return this.productService.findAllWithPrice();
    }

    @Get('/all/:subCategoryId?') 
    async getId( @Param('subCategoryId') subCategoryId: string) {
        return this.productService.findCategoryItems(subCategoryId);
    }

    @Put('/update/:id')
    async updateProduct(@Body() product: UpdateProductDto, @Param('id') productId:string) {
        return this.productService.updateById(productId ,product);
    }

    @Get('/id')
    async getProductById(@Body('id') id: string): Promise<Product> {
        return this.productService.findById(id);
    }

    @Delete('/delete/:id')
    async deleteProduct(@Param('id') id: string): Promise<{ status?: boolean; message?: string }> {
        return await this.productService.deleteById(id);
    }
}
