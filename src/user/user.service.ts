import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(user: Prisma.UserCreateInput) {
    const password = await this.encryptPassword(user.password);
    return this.prisma.user.create({
      data: {
        ...user,
        password,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  private async encryptPassword(password: string) {
    const saltOrRounds = this.configService.get<number>(
      'security.bcryptSaltOrRound',
    );
    return await bcrypt.hash(password, saltOrRounds);
  }
}
