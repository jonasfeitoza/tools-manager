import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ToolService } from './tool.service';
import CreateToolRequestDTO from './dto/create-tool-request.dto';
import { PaginatedResult } from '../common/pagination/paginated-result.interface';
import { ToolResponseDto } from './dto/tool-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';

@ApiTags('Tools')
@Controller('tools')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Get('/')
  @Header('Content-Type', 'application/json')
  @ApiQuery({
    name: 'tag',
    required: false,
    type: String,
    example: 'node,typescript',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  async tools(
    @Query('tag') tag?: string,
    @Query('page') page?: number,
  ): Promise<PaginatedResult<ToolResponseDto>> {
    return this.toolService.getTools(tag, page);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async detail(@Param('id') id: string): Promise<ToolResponseDto> {
    const data = await this.toolService.getTool(id);

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  @Post('/')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async create(
    @Body() data: CreateToolRequestDTO,
    @GetCurrentUser() user,
  ): Promise<ToolResponseDto> {
    return this.toolService.create(data, user.userId);
  }

  @Delete('/:id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-Type', 'application/json')
  async delete(@Param('id') id: string, @GetCurrentUser() user): Promise<any> {
    return this.toolService.delete(id, user.userId);
  }
}
