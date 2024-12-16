import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common'

export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		// console.log(exception)
		// 获取上下文的 HTTP 服务
		const ctx = host.switchToHttp()
		// 获取响应对象
		const response = ctx.getResponse()
		// 获取异常报错的状态码
		const status = exception.getStatus()
		// 获取异常错误的信息内容
		const errorContent = exception.getResponse()
		return response.status(status).json({
			message: errorContent,
			sss: 'sdad',
		})
	}
}
