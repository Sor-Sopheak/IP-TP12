export class UpdateProductDto {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly subCategoryId: string;
    readonly categoryId: string;
}