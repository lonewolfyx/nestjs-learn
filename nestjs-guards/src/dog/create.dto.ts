import { IsNumber, IsString } from 'class-validator'

export class CreateDto {
	// 姓名
	@IsString({
		message: '这里需要一个字符串',
	})
	name: string

	@IsNumber()
	age: number

	// 设置默认值
	email?: string = 'mail.@qq.com'
}

export class CreatIdDto {
	@IsNumber()
	id: number
}
