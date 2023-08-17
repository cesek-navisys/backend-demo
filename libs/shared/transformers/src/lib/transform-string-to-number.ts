import { BadRequestException } from '@nestjs/common';
export const transformStringToNumber = ({
	value,
	key,
}: {
	value?: string;
	key: string;
}) => {
	const transformedValue = Number(value);
	if (isNaN(transformedValue))
		throw new BadRequestException(`Value: ${value} is not a number`);

	return transformedValue;
};
