import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsController } from './cats/cats.controller'
import { CatsService } from './cats/cats.service'
import { CatsModule } from './cats/cats.module'
import { DogService } from './dog/dog.service';
import { DogController } from './dog/dog.controller';
import { CommonModule } from './common/common.module';
import { DogModule } from './dog/dog.module';

@Module({
	controllers: [AppController, CatsController, DogController],
	providers: [AppService, CatsService, DogService],
	imports: [CatsModule, CommonModule, DogModule],
})
export class AppModule {
}
