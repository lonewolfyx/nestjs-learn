import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggerConstMiddleware } from './middleware/logger.middleware'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	// 定义全局中间件
	app.use(LoggerConstMiddleware)
	await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
