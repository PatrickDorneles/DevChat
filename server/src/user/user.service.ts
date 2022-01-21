import { Injectable } from "@nestjs/common"

import { UserRepository } from "./user.repository"

@Injectable()
export class UserService {
	constructor(readonly userRepository: UserRepository) {}

	async getUsers() {
		return this.userRepository.find()
	}


}
