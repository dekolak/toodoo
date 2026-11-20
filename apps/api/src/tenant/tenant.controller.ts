import { Controller, Get, Patch, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CurrentUser, JwtUser } from '../common/current-user.decorator';

@Controller('tenant')
export class TenantController {
  constructor(private prisma: PrismaService) {}

  @Get()
  find(@CurrentUser() user: JwtUser) {
    return this.prisma.tenant.findUniqueOrThrow({ where: { id: user.tenantId } });
  }

  @Patch()
  update(@CurrentUser() user: JwtUser, @Body() body: { name?: string; colorMain?: string; colorAccent?: string }) {
    return this.prisma.tenant.update({ where: { id: user.tenantId }, data: body });
  }
}
