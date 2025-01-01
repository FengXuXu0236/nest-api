import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Menu } from '../interfaces/menu.interface';

@Injectable()
export class MenuRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Menu[]> {
    return this.prisma.menu.findMany();
  }

  async findOne(id: number): Promise<Menu | null> {
    return this.prisma.menu.findUnique({ where: { id } });
  }

  async create(data: Partial<Menu>): Promise<Menu> {
    return this.prisma.menu.create({ data });
  }

  async update(id: number, data: Partial<Menu>): Promise<Menu> {
    return this.prisma.menu.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.menu.delete({ where: { id } });
  }
}
