import { Module } from '@nestjs/common'
import { CatsService } from '../cats/cats.service'
import { AppService } from '../app.service'

@Module({
	providers: [CatsService, AppService],
	exports: [CatsService, AppService],
})
export class CommonModule {
}
