import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { GithubAuthApi } from "./github-auth.api"
import { GithubApi } from "./github.api"
import { GithubService } from "./github.service"

@Module({
  imports: [ConfigModule],
  providers: [GithubService, GithubApi, GithubAuthApi],
  exports: [GithubService]
})
export class GithubModule {}
