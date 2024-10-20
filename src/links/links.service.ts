import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private prismaService: PrismaService) {}

  async generate(target: string) {
    const hash = this.generateShortHash();
    return await this.createLink(target, hash);
  }

  async createLink(target: string, hash: string) {
    return await this.prismaService.link.create({
      data: {
        target: target,
        hash: hash
      }
    })
  }

  async findAll() {
    return await this.prismaService.link.findMany()
  }

  async findByHash(hash: string) {
    return await this.prismaService.link.findFirst({
      where: {
        hash: hash
      }
    })
  }

  generateShortHash(): string {
    const currentDate = new Date().toISOString();
    const hash = createHash('md5').update(currentDate).digest('hex')

    return hash.slice(0, 8)
  }
}
