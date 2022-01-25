import { Headers } from "@nestjs/common"
import { Query, Resolver } from "@nestjs/graphql"

import { User } from "./user.entity"
import { UserService } from "./user.service"

@Resolver(() => User)
export class UserResolver {
	constructor(readonly userService: UserService) {}

	@Query(() => [User], { name: "GetUsers" })
	async getUsers() {
		return this.userService.getUsers()
	}
}
