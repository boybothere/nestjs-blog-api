import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import config from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), TagModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
