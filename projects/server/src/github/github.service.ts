import { HttpService } from "@nestjs/axios"
import { HttpServer, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import axios from "axios"

import { AccessTokenResponseDto } from "./access-token-response.dto"
import { GithubAuthApi } from "./github-auth.api"
import { GithubUserDto } from "./github-user.dto"
import { GithubApi } from "./github.api"

@Injectable()
export class GithubService {
	constructor(
		private githubAuthApi: GithubAuthApi,
		private githubApi: GithubApi
	) {}

	async authGithubUserUsingCode(code: string, mobile = false) {
		
		const access_token = await this.githubAuthApi.getGithubAccessTokenByCode(code, mobile)

		return this.githubApi.getUserByAccessToken(access_token)
	}
}
