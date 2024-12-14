import { Controller, Get, HttpStatus, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google.guard';
import { Request, Response } from 'express';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async auth(
    @Res({ passthrough: true }) res: Response,
  ) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async callback(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const token = await this.authService.login(req.user);
    const url = req.cookies['default_redirect_uri'];

    response.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 // 1h
    })

    if (url) {
      response.redirect(url);
    }

    return response.status(HttpStatus.OK).json({
      message: 'Logged in successfully'
    });
  }

  @Get('session')
  @UseGuards(JwtGuard)
  async profile(
    @Req() req
  ) {
    return req.user;
  }
}
