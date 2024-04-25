import { Module } from "@nestjs/common";
import { TestModule } from "./test/test.module";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
// import { AdminModule } from '@adminjs/nestjs';
import { TasksModule } from "./tasks/tasks.module";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./http-exception.filter";

// TODO: Adminjs configuration

// const DEFAULT_ADMIN = {
//   email: "admin@aligntech.com",
//   password: "12345",
// };

// const authenticate = async (email: string, password: string) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN);
//   }
//   return null;
// };

@Module({
  imports: [
    DatabaseModule,
    // AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
    // import("@adminjs/nestjs").then(({ AdminModule }) =>
    //   AdminModule.createAdminAsync({
    //     useFactory: () => ({
    //       adminJsOptions: {
    //         rootPath: "/admin",
    //         resources: [],
    //       },
    //       auth: {
    //         authenticate,
    //         cookieName: "adminjs",
    //         cookiePassword: "secret",
    //       },
    //       sessionOptions: {
    //         resave: true,
    //         saveUninitialized: true,
    //         secret: "secret",
    //       },
    //     }),
    //   })
    // ),
    TestModule,
    UserModule,
    TasksModule,
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
