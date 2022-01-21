import { Test, TestingModule } from "@nestjs/testing"
import { UserRepository } from "./user.repository"

import { UserResolver } from "./user.resolver"
import { UserService } from "./user.service"

describe("UserResolver", () => {
	let resolver: UserResolver

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserResolver, UserService, UserRepository]
		})
		.overrideProvider(UserRepository).useValue({ find: jest.fn() })
		.compile()

		resolver = module.get<UserResolver>(UserResolver)
	})

	it("should be defined", () => {
		expect(resolver).toBeDefined()
	})

	describe("GetUsers", () => {
		it("should call userRepository for getting users when called", async () => {
			jest.spyOn(resolver.userService.userRepository, "find")

			await resolver.getUsers()

			expect(resolver.userService.userRepository.find).toBeCalledTimes(1)
		})
	})
})
