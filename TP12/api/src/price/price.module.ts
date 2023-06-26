import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PriceSchema } from './schemas/price.schema';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Price', schema: PriceSchema}])],
  providers: [PriceService],
  controllers: [PriceController]
})
export class PriceModule {}
