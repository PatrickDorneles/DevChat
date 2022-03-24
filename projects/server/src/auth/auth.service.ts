import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"

import { feedbacks } from "@/constants/feedback-messages.constants"
import { GithubUserDto } from "@/github/github-user.dto"
import { GithubService } from "@/github/github.service"
import { User } from "@/user/user.entity"
import { UserService } from "@/user/user.service"

@Injectable()
export class AuthService {
	constructor(
		readonly githubService: GithubService,
		readonly userService: UserService,
		readonly jwtService: JwtService,
		readonly configService: ConfigService
	) {}

	async authenticateUserByCode(code: string) {
		try {
			const githubUser = await this.githubService.authGithubUserUsingCode(
				code
			)
			const existentUser = await this.userService.getUserByGithubId(
				githubUser.id
			)

			if (existentUser) {
				return await this.authenticateWithUser(existentUser)
			}

			return await this.createUserAndAuthenticate(githubUser)
		} catch (error) {
			throw new UnauthorizedException(feedbacks.auth.not_able_to_auth)
		}
	}

	async validateUser(githubId: number) {
		const user = await this.userService.getUserByGithubId(githubId)
		if (user) {
			return user
		}
		return null
	}

	async authenticateWithUser(user: User) {
		const token = this.jwtService.sign(
			{ github_id: user.github_id },
			{
				secret: this.configService.get("jwt_secret"),
				expiresIn: "7d"
			}
		)

		return { user, token }
	}

	async createUserAndAuthenticate(githubUser: GithubUserDto) {
		const user = await this.userService.createUserByGithubUser(githubUser)

		return this.authenticateWithUser(user)
	}
}
