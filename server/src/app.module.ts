import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"

import { join } from "path"

import { ConfigModule } from "./@config/config.module"
import { UserModule } from "./user/user.module"
import { GithubModule } from './github/github.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), "src/schema.gql")
		}),
		ConfigModule,
		UserModule,
		GithubModule
	]
})
export class AppModule {}
