import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"

import { join } from "path"

import { ConfigModule } from "./@config/config.module"
import { UserModule } from "./user/user.module"

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), "src/schema.gql")
		}),
		ConfigModule,
		UserModule
	]
})
export class AppModule {}
