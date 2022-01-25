import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"

import { UserService } from "@/user/user.service"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		readonly configService: ConfigService,
		readonly userService: UserService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get("jwt_secret")
		})
	}

	async validate({ github_id }: any) {
		return await this.userService.getUserByGithubId(github_id)
	}
}
