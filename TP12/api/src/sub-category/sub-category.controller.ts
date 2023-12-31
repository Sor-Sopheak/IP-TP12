import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategory } from './schemas/sub-category.schema';
import { CreateSubcategoryDto } from './dto/create-subCategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Controller('item')
export class SubCategoryController {
    constructor(private subCategoryService: SubCategoryService) {}

    @Post('/add')
    async createSubCategory(@Body() SubCategory: CreateSubcategoryDto) {
        return await this.subCategoryService.create(SubCategory);
    }

    @Get('/all')
    async getAllSubCategory(): Promise<SubCategory[]> {
        return this.subCategoryService.findAll();
    }

    @Get('/id')
    async getSubCategory(@Body('id') id: string): Promise<SubCategory> {
        return this.subCategoryService.findById(id);
    }

    @Put('/update/:id')
    async updateSubCategory(@Body() subCategory: UpdateSubcategoryDto, @Param('id') subCategoryId:string): Promise<SubCategory> {
        return this.subCategoryService.updateById(subCategoryId ,subCategory);
    }

    @Delete('/delete/:id')
    async deleteSubCategory(@Param('id') id: string): Promise<{ status?: boolean; message?: string }> {
        return await this.subCategoryService.deleteById(id);
    }
}

