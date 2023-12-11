import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import LoginRequestDTO from './dto/login-request.dto';
import LoginResponseDTO from './dto/login-response.dto';
import RegisterRequestDTO from './dto/register-request.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginData: LoginRequestDTO): Promise<LoginResponseDTO> {
    return this.authService.login(loginData);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async register(@Body() registerData: RegisterRequestDTO) {
    return this.authService.register(registerData);
  }
}
