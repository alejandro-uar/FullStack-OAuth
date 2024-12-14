import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { Observable } from "rxjs";

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const url = request.query.redirectUrl;

    if (url) {
      response.cookie('default_redirect_uri', url, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24h
      })
    }

    return super.canActivate(context)
  }
}