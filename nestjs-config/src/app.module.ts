import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { DogService } from './dog/dog.service';
import { DogController } from './dog/dog.controller';
import { CommonModule } from './common/common.module';
import { DogModule } from './dog/dog.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [AppController, CatsController, DogController],
    providers: [
        AppService,
        CatsService,
        DogService,
        // {
        // 	provide: APP_FILTER,
        // 	useClass: AnyExceptionFilter,
        // },
    ],
    imports: [
        CatsModule,
        CommonModule,
        DogModule,
        // 导入配置模块
        ConfigModule.forRoot()
    ],
})

// 此处定义应用中间件
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('dog');
    }
}
