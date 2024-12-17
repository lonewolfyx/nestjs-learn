import {
	Body,
	Controller,
	Get,
	Header,
	HttpCode,
	HttpStatus,
	Post,
	Redirect,
	Req,
	Res,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { CreateCatDto } from './dto/create-cat.dto'
import { CatsService } from './cats.service'

@Controller('cats')
export class CatsController {
	// 使用 Request 获取请求链接参数
	@Get()
	find(@Req() request: Request): string {
		console.log(request.query)
		return 'sss'
	}

	// 使用 POST + 使用 状态码 + 使用 自定义响应 header 内容
	// 使用 @Body 接收参数
	@Post()
	@HttpCode(204)
	@Header('diy-header', 'test')
	create(@Body() CreateCatDto: CreateCatDto): string {
		console.log(CreateCatDto)
		return '创建成功接口'
	}

	// 文档跳转
	@Get('docs')
	@Redirect('https://docs.nestjs.com', 302)
	getDocs(): string {
		return '这是跳转文档案例'
	}

	// 使用 @Param 获取参数
	// @Get(':id')
	// findId(@Param() params: { id: string }): string {
	// 	console.log(params.id)
	// 	return `${params.id} 数据信息被获取到了`
	// }

	// 也可以直接结构获取具体的参数
	// @Get(':id')
	// findId(@Param('id') id: string): string {
	// 	console.log(id)
	// 	return `${id} 数据信息被获取到了`
	// }

	// POST 响应结果测试
	@Post('post')
	createTwo(@Res() res: Response) {
		res.status(HttpStatus.OK).json([
			{
				sss: 'sadas',
			},
		])
	}

	// 使用 Cat Service 模块
	constructor(private readonly CatsService: CatsService) {
	}

	// 使用 Service 去创建某个东西
	@Post('postCreate')
	createPost(@Body() CreateCatDto: CreateCatDto) {
		this.CatsService.create(CreateCatDto)
	}

	// 使用 service 获取所有
	@Get('alls')
	findServiceAll() {
		return this.CatsService.findAll()
	}
}
