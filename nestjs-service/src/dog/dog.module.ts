import { Module } from '@nestjs/common'
import { CommonModule } from '../common/common.module'

@Module({
	imports: [CommonModule],
	// providers: [DogService],
})
export class DogModule {
}
