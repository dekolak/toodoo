import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  findAll(tenantId: string, projectId?: string) {
    return this.prisma.task.findMany({
      where: { tenantId, archived: false, ...(projectId ? { projectId } : {}) },
      orderBy: [{ stage: { order: 'asc' } }, { order: 'asc' }],
      include: {
        assignees: { include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } } },
        checklistItems: { orderBy: { order: 'asc' } },
        tags: { include: { tag: true } },
      },
    });
  }

  findOne(id: string, tenantId: string) {
    return this.prisma.task.findFirstOrThrow({
      where: { id, tenantId },
      include: {
        assignees: { include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } } },
        checklistItems: { orderBy: { order: 'asc' } },
        tags: { include: { tag: true } },
        attachments: true,
      },
    });
  }

  create(tenantId: string, data: { title: string; stageId: string; projectId?: string; description?: string; priority?: 'low' | 'normal' | 'urgent'; dueDate?: Date; color?: string }) {
    return this.prisma.task.create({
      data: { ...data, tenantId },
      include: { assignees: { include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } } }, checklistItems: true, tags: { include: { tag: true } } },
    });
  }

  update(id: string, tenantId: string, data: Record<string, unknown>) {
    return this.prisma.task.updateMany({ where: { id, tenantId }, data }).then(() =>
      this.findOne(id, tenantId),
    );
  }

  async moveToStage(id: string, tenantId: string, stageId: string, order: number) {
    await this.prisma.task.updateMany({ where: { id, tenantId }, data: { stageId, order } });
    return this.findOne(id, tenantId);
  }
}
