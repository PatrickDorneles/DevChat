import { Test, TestingModule } from "@nestjs/testing"
import { UserRepository } from "./user.repository"

import { UserService } from "./user.service"

describe("UserService", () => {
	let service: UserService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, UserRepository]
		})
		.overrideProvider(UserRepository)
		.useValue({
			find: jest.fn()
		})
		.compile()

		service = module.get<UserService>(UserService)
	})

	it("should be defined", () => {
		expect(service).toBeDefined()
	})

	describe("GetUsers", () => {
		it("should run the userRepository find method", async () => {
			jest.spyOn(service.userRepository, "find")

			await service.getUsers()

			expect(service.userRepository.find).toBeCalledTimes(1)
		})
	})
})
