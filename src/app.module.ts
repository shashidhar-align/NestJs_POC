import { Module } from "@nestjs/common";
import { TestModule } from "./test/test.module";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
// import { AdminModule } from '@adminjs/nestjs';
import { TasksModule } from "./tasks/tasks.module";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./http-exception.filter";
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    DatabaseModule,
    TestModule,
    UserModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
