import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { REQUEST_USER_KEY } from "../constants/auth.constant";
import { TokenPayload } from "../types/jwt.type";

export const ActiveUser = createParamDecorator((fields: keyof TokenPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: TokenPayload | undefined = request.headers[REQUEST_USER_KEY];
    return fields ? user?.[fields] : user;
},
)
