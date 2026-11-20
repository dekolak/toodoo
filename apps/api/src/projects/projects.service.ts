import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll(tenantId: string) {
    return this.prisma.project.findMany({
      where: { tenantId, archived: false },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { tasks: true } } },
    });
  }

  findOne(id: string, tenantId: string) {
    return this.prisma.project.findFirstOrThrow({
      where: { id, tenantId },
      include: { milestones: { orderBy: { dueDate: 'asc' } } },
    });
  }

  create(tenantId: string, data: { name: string; description?: string; color?: string; startDate?: Date; endDate?: Date }) {
    return this.prisma.project.create({ data: { ...data, tenantId } });
  }

  update(id: string, tenantId: string, data: { name?: string; description?: string; color?: string; startDate?: Date; endDate?: Date; archived?: boolean }) {
    return this.prisma.project.updateMany({ where: { id, tenantId }, data }).then(() =>
      this.prisma.project.findUniqueOrThrow({ where: { id } }),
    );
  }
}
