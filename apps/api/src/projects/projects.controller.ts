import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CurrentUser, JwtUser } from '../common/current-user.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private projects: ProjectsService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.projects.findAll(user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.projects.findOne(id, user.tenantId);
  }

  @Post()
  create(@CurrentUser() user: JwtUser, @Body() body: { name: string; description?: string; color?: string }) {
    return this.projects.create(user.tenantId, body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @CurrentUser() user: JwtUser, @Body() body: { name?: string; description?: string }) {
    return this.projects.update(id, user.tenantId, body);
  }
}
