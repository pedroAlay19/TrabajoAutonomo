import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestWithUser } from "../interfaces/request-user.interface";

export const ActiveUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<RequestWithUser>();
        return request.user;
    }
)