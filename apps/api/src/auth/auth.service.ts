import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email ou mot de passe invalide');
    }
    const payload = { sub: user.id, tenantId: user.tenantId, role: user.role };
    return { access_token: this.jwt.sign(payload) };
  }

  async register(email: string, password: string, tenantName: string) {
    const hash = await bcrypt.hash(password, 10);
    const tenant = await this.prisma.tenant.create({ data: { name: tenantName } });

    const defaultStages = [
      { name: 'A faire', order: 0, type: 'todo' as const, tenantId: tenant.id },
      { name: 'En cours', order: 1, type: 'doing' as const, tenantId: tenant.id },
      { name: 'Termine', order: 2, type: 'done' as const, tenantId: tenant.id },
    ];
    await this.prisma.stage.createMany({ data: defaultStages });

    const user = await this.prisma.user.create({
      data: { email, password: hash, role: 'admin', tenantId: tenant.id },
    });

    const payload = { sub: user.id, tenantId: user.tenantId, role: user.role };
    return { access_token: this.jwt.sign(payload) };
  }
}
