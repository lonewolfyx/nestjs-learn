import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { DogService } from './dog.service'
import { Cat } from '../cats/interfaces/cat.interface'
import { ForbiddenException } from '../exception/forbidden.exception'
import { CreateDto, CreatIdDto } from './create.dto'
import { ValidationPipe } from '../pipe/validate.pipe'

@Controller('dog')
// 此处存放即为此 dog 路由下的都存放过滤器，路由下方的即不需要在使用 UseFilters 过滤器
// @UseFilters(HttpExceptionFilter)
export class DogController {
	constructor(private readonly DogService: DogService) {
	}

	@Get('test')
	// TODO 尽可能使用类而不是实例。由于 Nest 可以轻松地在整个模块中重复使用同一类的实例，因此可以减少内存使用。
	// @UseFilters(HttpExceptionFilter) // 此处是方法级的过滤器
	getDogs(): Cat[] {
		throw new ForbiddenException('这个是一个异常错误')
		// throw new ForbiddenException()

		return this.DogService.getDogs()
	}

	@Get()
	home(): string {
		return 'test'
	}

	// 验证器
	@Post()
	createDog(@Body(new ValidationPipe()) CreateDto: CreateDto) {
		return {
			sad: CreateDto,
		}
	}

	// @Post(':id')
	// creatDog(@Param('id') id: CreatIdDto) {
	// 	console.log(typeof id)
	// }

	@Post(':id')
	report(
		@Param('id', new ParseIntPipe({
			exceptionFactory: () => {
				throw new BadRequestException('这个是自定义的错误')
			}
		})) id: CreatIdDto,
		@Body() CreateDto: CreateDto,
	) {
		console.log(CreateDto)
		return {
			name: 'test',
		}
	}
}
