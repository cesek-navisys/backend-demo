import {
	ACCOUNT_CODE_API_PARAM,
	PRODUCTS_ALIAS,
	PRODUCT_CODE_API_PARAM,
} from '@backend-demo/shared/constants';
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ViewProductDto } from './dto/view-product.dto';
import { ProductExternalService } from './product-external.service';
import { productManagementRoutes } from './product-management.routes';

@ApiTags(PRODUCTS_ALIAS)
@Controller(productManagementRoutes.product)
export class ProductController {
	constructor(
		private readonly productExternalService: ProductExternalService
	) {}

	@ApiOperation({
		summary: 'Get product',
	})
	@ApiResponse({ type: ViewProductDto })
	@Get(`:${PRODUCT_CODE_API_PARAM}`)
	async findOne(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(PRODUCT_CODE_API_PARAM) productCode: string,
		@Query() query?: ProductQueryDto
	) {
		const result = this.productExternalService.findOne(
			{ productCode, accountCode },
			query
		);

		return plainToClass(ViewProductDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Get all products',
	})
	@ApiResponse({
		type: ViewProductDto,
		isArray: true,
	})
	@Get()
	async findAll(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Query() query?: ProductQueryDto
	) {
		const result = this.productExternalService.findAll(
			{ accountCode },
			query
		);
		return plainToClass(ViewProductDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Create product',
	})
	@ApiResponse({ type: ViewProductDto })
	@Post()
	async create(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Body() createProductDto: CreateProductDto
	) {
		const result = this.productExternalService.create(
			{ accountCode },
			createProductDto
		);
		return plainToClass(ViewProductDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Update product',
	})
	@ApiResponse({ type: ViewProductDto })
	@Put(`:${PRODUCT_CODE_API_PARAM}`)
	async update(
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string,
		@Param(PRODUCT_CODE_API_PARAM) productCode: string,
		@Body() updateProductDto: UpdateProductDto
	) {
		const result = this.productExternalService.update(
			{ accountCode, productCode },
			updateProductDto
		);
		return plainToClass(ViewProductDto, result, {
			excludeExtraneousValues: true,
		});
	}

	@ApiOperation({
		summary: 'Delete product',
	})
	@Delete(`:${PRODUCT_CODE_API_PARAM}`)
	async delete(
		@Param(PRODUCT_CODE_API_PARAM) productCode: string,
		@Param(ACCOUNT_CODE_API_PARAM) accountCode: string
	) {
		return this.productExternalService.delete({ productCode, accountCode });
	}
}
