import { IProductViewMapper } from './interfaces/view-product-mapper.interface';
import { ViewProductDto } from './view-product.dto';

export class ViewProductMapperDto
	extends ViewProductDto
	implements IProductViewMapper {
	// @ApiPropertyOptional({
	// 	type: ViewAccountDto,
	// })
	// Owner?: ViewAccountDto;
}
