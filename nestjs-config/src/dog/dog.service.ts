import { Injectable } from '@nestjs/common'
import { CatsService } from '../cats/cats.service'
import { Cat } from '../cats/interfaces/cat.interface'
import { AppService } from '../app.service'

@Injectable()
export class DogService {
	constructor(
		private readonly CatsService: CatsService,
		private readonly AppService: AppService,
	) {
	}

	getDogs(): Cat[] {
		console.log(this.AppService.getHello())
		return this.CatsService.findAll()
	}
}
