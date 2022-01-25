import {
	ExecutionContext,
	Headers,
	NotImplementedException,
	Request,
	UseGuards
} from "@nestjs/common"
import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql"

import { User } from "@/user/user.entity"

import { feedback_messages } from "./../constants/feedback-messages.constants"
import { JwtAuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"
import { CurrentUser } from "./current-user.decorator"

@Resolver()
export class AuthResolver {
	constructor(readonly authService: AuthService) {}

	@Mutation((returns) => User, { name: "Authenticate" })
	async authenticate(
		@Args({ name: "code", type: () => String })
		code: string,
		@Args({ name: "mobile", type: () => Boolean, defaultValue: false })
		mobile: boolean
	) {
		if (mobile)
			throw new NotImplementedException(
				feedback_messages.generic.not_implemented
			)

		return this.authService.authenticateUserByCode(code)
	}

	@UseGuards(JwtAuthGuard)
	@Query(() => User, { name: "Profile" })
	async getAuthenticatedUser(@CurrentUser() user: User) {
		console.log(user)

		throw new NotImplementedException()
	}
}
