import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { Axios } from "axios"

import { AccessTokenResponseDto } from "./access-token-response.dto"

const BASE_URL = "https://github.com/login/oauth/access_token"

@Injectable()
export class GithubAuthApi extends Axios {

    constructor(private configService: ConfigService) {
        super({
            baseURL: BASE_URL
        })
    }

    async getGithubAccessTokenByCode(code: string, mobile: boolean) {
        const clientId = this.configService.get(`${mobile && "mobile_"}gh_client_id`)
		const clientSecret = this.configService.get(`${mobile && "mobile_"}gh_client_secret`)

        const response = await this.post<AccessTokenResponseDto>("/",null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                code
            },
            headers: {
                Accept: "application/json"
            }
        })

		return response.data.access_token
    }
}