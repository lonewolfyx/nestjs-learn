// @Injectable()
// export class ValidatePipe implements PipeTransform {
// 	transform(value: any, metadata: ArgumentMetadata): any {
// 		return value
// 	}
// }


import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform {
	// value 为当前的请求参数，即 DTO 中的参数内容
	async transform(value: any, { metatype }: ArgumentMetadata) {
		console.log(value)
		const object = plainToInstance(metatype, value)
		const errors = await validate(object)
		console.log(Object.values(errors[0]['constraints'])[0])
		if (errors.length > 0) {
			// 直接取 DTO 中校验的错误提示语
			const tips = Object.values(errors[0]['constraints'])[0]
			throw new BadRequestException(tips)
			// throw new BadRequestException('Validation failed')
		}

		return value
	}
}
