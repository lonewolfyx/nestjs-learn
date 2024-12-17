import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
    Version,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { Cat } from '../cats/interfaces/cat.interface';
import { ForbiddenException } from '../exception/forbidden.exception';
import { AuthGuard } from '../guard/auth.guard';
import { CreateDto, CreatIdDto } from './create.dto';
import { ConfigService } from '@nestjs/config';
import * as process from 'node:process';

@Controller({
    path: 'dog',
    version: ['1', '2'],
})
// 此处存放即为此 dog 路由下的都存放过滤器，路由下方的即不需要在使用 UseFilters 过滤器
// @UseFilters(HttpExceptionFilter)
// 使用版本控制
export class DogController {
    constructor(
        private readonly DogService: DogService,
        private readonly ConfigService: ConfigService,
    ) {
    }

    @Get('test')
    // TODO 尽可能使用类而不是实例。由于 Nest 可以轻松地在整个模块中重复使用同一类的实例，因此可以减少内存使用。
    // @UseFilters(HttpExceptionFilter) // 此处是方法级的过滤器
    getDogs(): Cat[] {
        throw new ForbiddenException('这个是一个异常错误');
        // throw new ForbiddenException()

        return this.DogService.getDogs();
    }

    @Get()
    home(): string {
        return 'test';
    }

    // 验证器
    // @Post()
    // createDog(@Body(new ValidationPipe()) CreateDto: CreateDto) {
    //     return {
    //         sad: CreateDto,
    //     };
    // }

    // @Post(':id')
    // creatDog(@Param('id') id: CreatIdDto) {
    // 	console.log(typeof id)
    // }

    @Post(':id')
    @UseGuards(AuthGuard)
    // @UseInterceptors(LoggingInterceptor)
    // 定义 v2 版本
    @Version('2')
    report(
        @Param(
            'id',
            new ParseIntPipe({
                exceptionFactory: () => {
                    throw new BadRequestException('这个是自定义的错误');
                },
            }),
        )
            id: CreatIdDto,
        @Body() CreateDto: CreateDto,
    ) {
        console.log('POST 参数 DTO', CreateDto);
        // 使用 process.env.xxx
        // 此仅需要在 app.module.ts imports 中导入 ConfigModule.forRoot() 模块
        // 并且设置 isGlobal 为 true 因此此处为 全局配置的环境变量获取
        console.log('env process', process.env.DATABASE_USER);
        // 使用 @nest/config ConfigService get 方法读取 .env 文件
        // 但是需要注意的是 如果要按照此使用需要在 xx.module.ts 中引入 ConfigModule
        // 最终在 constructor 中 使用 private readonly ConfigService:ConfigService
        console.log('env', this.ConfigService.get<string>('DATABASE_USER'));
        return {
            name: 'test',
        };
    }
}
