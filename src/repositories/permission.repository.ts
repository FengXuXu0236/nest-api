import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Permission } from '../interfaces/permission.interface';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Permission[]> {
    return this.prisma.permission.findMany();
  }

  async findOne(id: number): Promise<Permission | null> {
    return this.prisma.permission.findUnique({ where: { id } });
  }

  async create(data: Partial<Permission>): Promise<Permission> {
    return this.prisma.permission.create({ data });
  }

  async update(id: number, data: Partial<Permission>): Promise<Permission> {
    return this.prisma.permission.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.permission.delete({ where: { id } });
  }
}
