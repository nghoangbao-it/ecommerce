import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

function createPrismaErrorGuard(code: string) {
  return function (error: any): error is PrismaClientKnownRequestError {
    return (
      error instanceof PrismaClientKnownRequestError && error.code === code
    );
  };
}
export const isUniqueContraintPrismaError = createPrismaErrorGuard('P2002');
export const isRecordNotFoundPrismaError = createPrismaErrorGuard('P2025');

// export function isUniqueContraintPrismaError(
//   error: any,
// ): error is PrismaClientKnownRequestError {
//   return (
//     error instanceof PrismaClientKnownRequestError && error.code === 'P2002'
//   );
// }
// export function isReCordNotFoundPrismaError(
//   error: any,
// ): error is PrismaClientKnownRequestError {
//   return (
//     error instanceof PrismaClientKnownRequestError && error.code === 'P2025'
//   );
// }
