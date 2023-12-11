import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import LoginRequestDTO from './dto/login-request.dto';
import LoginResponseDTO from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import RegisterRequestDTO from './dto/register-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.userService.findByEmail(loginData.email);

    if (!user) {
      //@TODO: log invalid login attempt
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await bcrypt.compare(loginData.password, user.password);

    if (!match) {
      //@TODO: log invalid login attempt
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(registerData: RegisterRequestDTO) {
    const { email } = registerData;

    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.userService.create({
      ...registerData,
    });

    return;
  }
}
