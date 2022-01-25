import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import axios from "axios"

import { AccessTokenResponseDto } from "./access-token-response.dto"
import { GithubUserDto } from "./github-user.dto"

const githubOAuthApiUrl = "https://github.com/login/oauth/access_token"
const githubApiUrl = "https://api.github.com"

@Injectable()
export class GithubService {
    constructor(private configService: ConfigService) {}

    public githubAuthApi = axios.create({
        baseURL: githubOAuthApiUrl
    })

    public githubApi = axios.create({
        baseURL: githubApiUrl
    })

    async authGithubUserUsingCode(code: string, mobile = false) {
        const { data: accessTokenResponse } =
            await this.githubAuthApi.post<AccessTokenResponseDto>("", null, {
                params: {
                    client_id: (
                        mobile ? 
                        this.configService.get("mobile_gh_client_id") :
                        this.configService.get("gh_client_id")
                    ),
                    client_secret: (
                        mobile ? 
                        this.configService.get("mobile_gh_client_secret") :
                        this.configService.get("gh_client_secret")
                    ),
                    code,
                },
                headers: {
                    "Accept": "application/json"
                }
            })

        const { data: githubUser } = await this.githubApi.get<GithubUserDto>("user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        return githubUser
    }

}
