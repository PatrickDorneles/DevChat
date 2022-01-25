import { ConfigService } from "@nestjs/config"
import { Test, TestingModule } from "@nestjs/testing"

import { GithubService } from "./github.service"

describe("GithubService", () => {
  let service: GithubService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubService, ConfigService],
    })
    .overrideProvider(ConfigService).useValue({ })
    .compile()

    service = module.get<GithubService>(GithubService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
