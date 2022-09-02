import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../types';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(_: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    return next.handle().pipe(map((data) => ({ status: 'success', data })));
  }
}
