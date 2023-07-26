import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductExternalService } from './product-external.service';
import { ProductQueryDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ViewProductMapperDto } from './dto/view-product-mapper.dto';

@Controller('/products')
export class ProductController {
	constructor(
		private readonly productExternalService: ProductExternalService
	) {}

	@Get(':code')
	async findOne(
		@Param() productCode: string,
		@Query() query?: ProductQueryDto
	) {
		return await this.productExternalService.findOne(productCode, query);
	}

	@Get()
	async findAll(
		@Body() params: ViewProductMapperDto,
		@Query() query?: ProductQueryDto
	) {
		return await this.productExternalService.findAll(params, query);
	}

	@Get()
	async findFirst(
		@Body() params: ViewProductMapperDto,
		@Query() query?: ProductQueryDto
	) {
		return await this.productExternalService.findFirst(params, query);
	}

	@Get()
	async findAndCountAll(
		@Body() params: ViewProductMapperDto,
		@Query() query?: ProductQueryDto
	) {
		return await this.productExternalService.findAndCountAll(params, query);
	}

	@Post()
	async createOne(@Body() params: CreateProductDto) {
		return await this.productExternalService.createOne(params);
	}

	@Put(':code')
	async updateOne(
		@Param() productCode: string,
		@Body() params: UpdateProductDto
	) {
		return await this.productExternalService.updateOne(productCode, params);
	}

	@Delete(':code')
	async deleteOne(productCode: string) {
		return await this.productExternalService.delete(productCode);
	}

	@Put(':code')
	async restoreOne(productCode: string) {
		return await this.productExternalService.restore(productCode);
	}
}
