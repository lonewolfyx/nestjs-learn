import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [CommonModule, ConfigModule],
    // providers: [DogService],
})
export class DogModule {
}
