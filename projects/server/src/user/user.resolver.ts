import { Query, Resolver } from "@nestjs/graphql"

import { User } from "./user.entity"
import { UserService } from "./user.service"

@Resolver(() => User)
export class UserResolver {
	constructor(readonly userService: UserService) {}

	@Query(() => [User])
	async users() {
		return this.userService.getUsers()
	}
}
