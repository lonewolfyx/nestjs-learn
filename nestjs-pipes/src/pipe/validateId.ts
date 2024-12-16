import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidateId implements PipeTransform {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		console.log('验证的数据值', value, metatype)
		console.log(plainToClass(metatype, value))
		const object = plainToInstance(metatype, value)
		console.log(object)
		const errors = await validate(object)
		if (errors.length > 0) {
			// 直接取 DTO 中校验的错误提示语
			const tips = Object.values(errors[0]['constraints'])[0]
			throw new BadRequestException(tips)
			// throw new BadRequestException('Validation failed')
		}

		return value
	}
}
