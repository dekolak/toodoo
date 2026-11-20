import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CurrentUser, JwtUser } from '../common/current-user.decorator';

@Controller('tags')
export class TagsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.prisma.tag.findMany({
      where: { tenantId: user.tenantId },
      orderBy: { name: 'asc' },
    });
  }

  @Post()
  create(@CurrentUser() user: JwtUser, @Body() body: { name: string; color?: string }) {
    return this.prisma.tag.create({ data: { ...body, tenantId: user.tenantId } });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    await this.prisma.tag.deleteMany({ where: { id, tenantId: user.tenantId } });
    return { deleted: true };
  }
}
