import { Injectable } from '@nestjs/common';
import { RoleName } from 'src/shared/constants/role.constant';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class RoleService {
  private clientRoleId: null | number = null;
  private sellerRoleId: null | number = null;
  constructor(private readonly prismaService: PrismaService) {}


  async getClientRoleId(userId: number) {
    if (this.clientRoleId) {
      return this.clientRoleId;
    }
    const clientRole = await this.prismaService.role.findFirst({
      where: {
        name: RoleName.Client,
      },
    });
    if (!clientRole) {
      throw new Error('Client role not found');
    }
    this.clientRoleId = clientRole.id;
    return this.clientRoleId;
  }

  async getSellerRoleId(userId: number) {
    if (this.sellerRoleId) {
      return this.sellerRoleId;
    }
    const sellerRole = await this.prismaService.role.findFirst({
      where: {
        name: RoleName.Seller,
      },
    });
    if (!sellerRole) {
      throw new Error('Seller role not found');
    }
    this.sellerRoleId = sellerRole.id;
    return this.sellerRoleId;
  }
}
