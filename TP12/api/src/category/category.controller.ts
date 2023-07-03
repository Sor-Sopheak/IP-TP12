import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schemas/category.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post('/add')
    async createCategory(@Body() Category: CreateCategoryDto) {
        return await this.categoryService.create(Category);
    }

    @Get('/all')
    async getAllCategories(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    // Get by ID
    @Get('/id')
    async getCategory(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findById(id);
    }

    // Update by ID
    @Put('/update/:id')
    async updateCategpry(@Body() category: UpdateCategoryDto,@Param("id") categoryId:string) {
        return this.categoryService.updateById(categoryId, category);
    }

    // Delete by ID
    @Delete('/delete/:id')
    async deleteCategory(@Param('id') id: string): Promise<{status?: boolean; message?: string }> {
        return await this.categoryService.deleteById(id);
    }
}
