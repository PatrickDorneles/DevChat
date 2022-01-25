import { Controller, Get, Res } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { Response } from "express"

@Controller("github")
export class GithubController {
	constructor(readonly configService: ConfigService) {}

	@Get("/")
	async redirectToGithubLogin(@Res() res: Response) {
		const clientId = this.configService.get("gh_client_id")
		const url = `https://github.com/login/oauth/authorize?client_id=${clientId}`
		res.redirect(url)
	}
}
