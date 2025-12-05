import envConfig from 'src/shared/config';
import { RoleName } from 'src/shared/constants/role.constant';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';

export async function seedData() {
  const prismaService = new PrismaService();
  const hashingService = new HashingService();

  const roleCount = await prismaService.role.count();
  if (roleCount > 0) {
    throw new Error('Role has exist');
  }

  const roles = await prismaService.role.createManyAndReturn({
    data: [
      {
        name: RoleName.Admin,
        description: 'Admin Role',
      },
      {
        name: RoleName.Client,
        description: 'Client Role',
      },
      {
        name: RoleName.Seller,
        description: 'Seller Role',
      },
    ],
  });
  const adminRoleId =  roles.find(role => role.name == RoleName.Admin)?.id
  if(!adminRoleId) {
    throw new Error('Admin role is not initialize')
  }
  const hashingPassword = hashingService.hashData(envConfig.ADMIN_PASSWORD)
  await prismaService.user.create({
    data: {
        name: envConfig.ADMIN_NAME,
        email: envConfig.ADMIN_EMAIL,
        password: hashingPassword,
        phoneNumber: envConfig.ADMIN_PHONE_NUMBER,
        roleId: adminRoleId

    }
  })
}
