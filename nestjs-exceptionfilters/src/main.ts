import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	// 定义全局中间件
	// app.use(LoggerConstMiddleware)
	// 定义全局过滤器 · 全局异常过滤器
	// 但是无法注入依赖到每个模块中 · 因此不推荐在此处设置异常过滤器
	// app.useGlobalFilters(new HttpExceptionFilter())
	await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
