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
import { AuthResponse } from "./auth-response.type"
import { JwtAuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"
import { CurrentUser } from "./current-user.decorator"

@Resolver()
export class AuthResolver {
	constructor(readonly authService: AuthService) {}

	@Mutation((returns) => AuthResponse)
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
	@Query(() => User)
	async profile(@CurrentUser() user: User) {
		return user
	}
}
