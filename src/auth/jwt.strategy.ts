import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { SecurityConfig } from '../common/config/config.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(JWTStrategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    console.log('sC:       ', configService.get<string>('security.secret'));
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<SecurityConfig>('security').secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
