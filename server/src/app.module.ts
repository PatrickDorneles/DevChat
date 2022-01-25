
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"

import { join } from "path"

import { AuthModule } from "./auth/auth.module"
import { GithubModule } from "./github/github.module"
import { UserModule } from "./user/user.module"


@Module({
	imports: [
		TypeOrmModule.forRoot(),
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), "src/schema.gql")
		}),
		ConfigModule.forRoot(),
		UserModule,
		GithubModule,
		AuthModule
	]
})
export class AppModule {}
