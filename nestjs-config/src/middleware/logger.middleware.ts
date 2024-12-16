import { NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log(req.query)
		next()
	}
}

export const LoggerConstMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// console.log(req.query)
	if (req.query?.['id'] === '1') {
		return res.json({
			message: 'hello',
		})
	}

	next()
}
