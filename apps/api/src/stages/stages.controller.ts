import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CurrentUser, JwtUser } from '../common/current-user.decorator';

@Controller('stages')
export class StagesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.prisma.stage.findMany({
      where: { tenantId: user.tenantId },
      orderBy: { order: 'asc' },
    });
  }

  @Post()
  create(@CurrentUser() user: JwtUser, @Body() body: { name: string; order?: number; color?: string; type?: 'todo' | 'doing' | 'done' }) {
    return this.prisma.stage.create({ data: { ...body, tenantId: user.tenantId } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @CurrentUser() user: JwtUser, @Body() body: { name?: string; order?: number; color?: string; hidden?: boolean }) {
    return this.prisma.stage.updateMany({ where: { id, tenantId: user.tenantId }, data: body }).then(() =>
      this.prisma.stage.findUniqueOrThrow({ where: { id } }),
    );
  }
}
