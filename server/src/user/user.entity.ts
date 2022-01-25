import { Field, Int, ObjectType } from "@nestjs/graphql"

import { Column, Entity, PrimaryColumn } from "typeorm"

const entity_name = "user"

@ObjectType()
@Entity({ name: entity_name })
export class User {
	@Field((type) => String)
	@PrimaryColumn()
	id: string

	@Field((type) => String)
	@Column()
	username: string

	@Field((type) => String)
	@Column()
	name: string

	@Field((type) => Int)
	@Column()
	github_id: number

	@Field((type) => String)
	@Column()
	avatar_url: string
}
