import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ConfigModule } from '@nestjs/config';
import { DogService } from './dog.service';
import { DatabaseModule } from '../database/db.module';

@Module({
    imports: [CommonModule, ConfigModule, DatabaseModule],
    providers: [DogService],
})
export class DogModule {
}
