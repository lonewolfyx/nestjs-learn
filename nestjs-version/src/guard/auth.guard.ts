import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const { params, query, body } = request;
        console.log('请求参数 守卫', params, query, body);

        // 若是 返回 false 则触发了 ForbiddenException 异常
        return true;
    }
}
