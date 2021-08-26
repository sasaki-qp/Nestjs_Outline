import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthDecorator = createParamDecorator(
    (argument: String, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest()
        const data = req.body[`${argument}`];
        return data
    }
)