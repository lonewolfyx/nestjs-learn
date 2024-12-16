// 自定义异常处理器
import { HttpException, HttpStatus } from '@nestjs/common'

export class ForbiddenException extends HttpException {
	constructor(response: string | Record<string, any>) {
		super(response, HttpStatus.FORBIDDEN)
	}
}
