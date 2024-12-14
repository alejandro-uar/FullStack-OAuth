import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async generateJwt(payload) {
    return await this.jwtService.signAsync(payload);
  }

  async login(user) {
    if (!user) throw new BadRequestException();

    //TODO: Register user into database

    return await this.generateJwt(user);
  }
}
