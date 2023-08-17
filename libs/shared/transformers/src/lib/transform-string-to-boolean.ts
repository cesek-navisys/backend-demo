export const transformStringToBoolean = ({
	value,
	key,
}: {
	value?: string;
	key: string;
}) => {
	return String(value).toLowerCase() === String(true);
};
