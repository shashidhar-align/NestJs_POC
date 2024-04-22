import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TestModule, DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
