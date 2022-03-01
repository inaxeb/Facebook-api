import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate( usernameField: string, passwordField: string): Promise<any> {
    const user = await this.authService.validateUser(usernameField, passwordField);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}