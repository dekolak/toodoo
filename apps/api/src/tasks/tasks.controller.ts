import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CurrentUser, JwtUser } from '../common/current-user.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private tasks: TasksService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser, @Query('projectId') projectId?: string) {
    return this.tasks.findAll(user.tenantId, projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.tasks.findOne(id, user.tenantId);
  }

  @Post()
  create(@CurrentUser() user: JwtUser, @Body() body: { title: string; stageId: string; projectId?: string; description?: string; priority?: 'low' | 'normal' | 'urgent'; dueDate?: Date; color?: string }) {
    return this.tasks.create(user.tenantId, body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @CurrentUser() user: JwtUser, @Body() body: Record<string, unknown>) {
    return this.tasks.update(id, user.tenantId, body);
  }

  @Patch(':id/move')
  move(@Param('id') id: string, @CurrentUser() user: JwtUser, @Body() body: { stageId: string; order: number }) {
    return this.tasks.moveToStage(id, user.tenantId, body.stageId, body.order);
  }
}
