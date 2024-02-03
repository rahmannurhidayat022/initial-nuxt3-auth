export interface RequestResponse {
	message: string;
	success: boolean;
	data: any;
	error: [];
}

export interface User {
	name: string;
	bio: null;
	username: string;
	id_role: number;
	avatarUrl: string;
	lab_agreement: number;
	subscribe: number;
	subscribe_end_date: Date;
	point: number;
	xp: number;
	certificate_name_updated: number;
}

export type UserWithoutPassword = Omit<User, "password">;
