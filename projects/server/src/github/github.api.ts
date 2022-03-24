import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { Axios } from "axios"

import { GithubUserDto } from "./github-user.dto"

const BASE_URL = "https://api.github.com"

@Injectable()
export class GithubApi extends Axios {

    constructor(private configService: ConfigService) {
        super({
            baseURL: BASE_URL
        })
    }

    async getUserByAccessToken(accessToken: string) {
        const { data: githubUser } = await this.get<GithubUserDto>(
			"user",
			{
				headers: {
					authorization: `Bearer ${accessToken}`
				}
			}
		)

        return githubUser
    }

}