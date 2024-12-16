import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost): any {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()

		console.log(host.switchToHttp())

		return response.status(exception.getStatus()).json({
			message: exception.message
		})
	}
}
