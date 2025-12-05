
import { SetMetadata } from '@nestjs/common';
import { AuthTypeType, ConditionGuard, ConditionGuardType,  } from '../constants/auth.constant';

export const AUTH_GUARD_KEY = 'auth_type_key';
export type AUTH_GUARD_TYPE = {
    authTypes: AuthTypeType[],
    options: ConditionGuardType
}

export const Auth = function (authTypes: AuthTypeType[], options?: ConditionGuardType ) {
    return SetMetadata(AUTH_GUARD_KEY, {authTypes, options: options ?? ConditionGuard.And} );
}
