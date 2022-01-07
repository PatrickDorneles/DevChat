import { Field, Int, ObjectType } from "@nestjs/graphql"

import { Column, Entity, PrimaryColumn } from "typeorm"

const name = "user"

@ObjectType(name)
@Entity({ name })
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

	@Column()
	password: string
}
