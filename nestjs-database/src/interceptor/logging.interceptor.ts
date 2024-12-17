import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>) {
        console.log('Before...');

        // console.log(context)
        const now = Date.now();

        return next.handle().pipe(
            // tap(() => {
            // 	console.log(`sadad ${now}`)
            // }),
            // catchError(async () => new Error('sad')),
        );
    }
}
