import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { GithubModule } from "@/github/github.module"

import { UserRepository } from "./user.repository"
import { UserResolver } from "./user.resolver"
import { UserService } from "./user.service"

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository]), GithubModule],
	providers: [UserResolver, UserService],
	exports: [UserService]
})
export class UserModule {}
