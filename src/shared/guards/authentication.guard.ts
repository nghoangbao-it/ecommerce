import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_GUARD_KEY, AUTH_GUARD_TYPE } from '../decorators/auth.decorator';
import { ApiKeyGuard } from './api-key.guard';
import { AccessTokenGuard } from './access-token.guard';
import {
  AuthType,
  AuthTypeType,
  ConditionGuard,
} from '../constants/auth.constant';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  guards: Record<AuthTypeType, CanActivate>;
  constructor(
    private readonly reflector: Reflector,
    private readonly apiKeyGuard: ApiKeyGuard,
    private readonly bearer: AccessTokenGuard,
  ) {
    this.guards = {
      [AuthType.ApiKey]: apiKeyGuard,
      [AuthType.Bearer]: bearer,
      [AuthType.None]: {
        canActivate: async () => true,
      },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthGuard = this.reflector.getAllAndOverride<
      AUTH_GUARD_TYPE | undefined
    >(AUTH_GUARD_KEY, [context.getHandler(), context.getClass()]);

    if (!isAuthGuard) {
      return true;
    }
    const { authTypes, options } = isAuthGuard;

    if (options === ConditionGuard.And) {
      for (const instance of authTypes) {
        const canActivate = await this.guards[instance].canActivate(context);
        if (!canActivate) {
          throw new UnauthorizedException();
        }
      }
      return true;
    }

    if (options === ConditionGuard.Or) {
      let err = new UnauthorizedException();
      for (const instance of authTypes) {
        try {
          const canActivate = await this.guards[instance].canActivate(context);
          if (canActivate) {
            return true;
          }
        } catch (error) {
          err = error;
        }
      }
      throw err;
    }

    return true;
  }
}
