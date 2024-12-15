import { Controller, Get } from '@nestjs/common'
import { DogService } from './dog.service'

@Controller('dog')
export class DogController {
	constructor(private readonly DogService: DogService) {
	}

	@Get()
	getDogs() {
		return this.DogService.getDogs()
	}
}
