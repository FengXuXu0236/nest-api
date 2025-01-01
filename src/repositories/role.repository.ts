import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../interfaces/role.interface';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async findOne(id: number): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async create(data: Partial<Role>): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  async update(id: number, data: Partial<Role>): Promise<Role> {
    return this.prisma.role.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.role.delete({ where: { id } });
  }
}
