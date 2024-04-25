import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { JwtStrategy } from "./jwt.strategy";

export const jwtSecret = "zjsP9h6ZI5sLoSKaCRj";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: "15m" }, // e.g. 30s, 7d, 24h
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
