export interface ICreationAttributesBase {
	createdAt?: string;
	updatedAt?: string;
	// Due to paranoid option set
	deletedAt?: string;
}
