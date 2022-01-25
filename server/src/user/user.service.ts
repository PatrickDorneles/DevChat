import { Injectable } from "@nestjs/common"

import { GithubUserDto } from "@/github/github-user.dto"
import { GithubService } from "@/github/github.service"
import { v4 as uuid } from "uuid"

import { UserRepository } from "./user.repository"

@Injectable()
export class UserService {
	constructor(
		readonly userRepository: UserRepository,
		readonly githubService: GithubService
	) {}

	async getUsers() {
		return this.userRepository.find()
	}

	async getUserByGithubId(id: number) {
		return await this.userRepository.findOne({
			github_id: id
		})
	}

	async createUserByGithubUser(githubUser: GithubUserDto) {
		const user = this.userRepository.create({
			id: uuid(),
			github_id: githubUser.id,
			name: githubUser.name,
			username: githubUser.login,
			avatar_url: githubUser.avatar_url
		})

		return this.userRepository.save(user)
	}
}
