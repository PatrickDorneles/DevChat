import { forwardRef, Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"

import { GithubModule } from "@/github/github.module"
import { UserModule } from "@/user/user.module"

import { AuthResolver } from "./auth.resolver"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./jwt.strategy"

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.jwt_secret,
			signOptions: { expiresIn: "60s" }
		}),
		ConfigModule,
		forwardRef(() => UserModule),
		GithubModule
	],
	providers: [AuthService, AuthResolver, JwtStrategy],
	exports: [AuthService]
})
export class AuthModule {}
