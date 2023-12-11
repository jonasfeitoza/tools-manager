import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaginatedResult } from '../common/pagination/paginated-result.interface';
import { Prisma, User } from '@prisma/client';
import { PaginateFunction, paginator } from '../common/pagination/paginator';
import CreateToolRequestDTO from './dto/create-tool-request.dto';
import { ToolResponseDto } from './dto/tool-response.dto';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class ToolService {
  constructor(private prisma: PrismaService) {}

  async getTools(
    tag: string = '',
    page: number = 1,
  ): Promise<PaginatedResult<ToolResponseDto>> {
    return paginate(
      this.prisma.tool,
      {
        select: {
          id: true,
          title: true,
          link: true,
          description: true,
          tags: true,
          isPublic: true,
        },
        where: {
          tags: {
            hasEvery: tag ? tag.split(',') : [],
          },
          isPublic: true,
        },
        orderBy: {
          title: 'asc',
        },
      },
      {
        page,
      },
    );
  }

  async create(
    data: CreateToolRequestDTO,
    userId: string,
  ): Promise<ToolResponseDto> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid user');
    }

    const toolData: Prisma.ToolCreateInput = {
      ...data,
      user: {
        connect: {
          id: user.id,
        },
      },
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.prisma.tool.create({
      data: {
        ...toolData,
      },
    });
  }

  async getTool(id: string): Promise<ToolResponseDto> {
    return this.prisma.tool.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string, userId: string): Promise<any> {
    //check if tool exists
    const tool = await this.prisma.tool.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!tool) {
      throw new BadRequestException('Invalid tool');
    }

    return this.prisma.tool.delete({
      where: {
        id,
      },
    });
  }
}
