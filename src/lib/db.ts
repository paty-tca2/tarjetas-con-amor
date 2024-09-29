import { PrismaClient } from '@prisma/client'

// Function to create a new PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient()
}

// Extend the globalThis type to include our prisma instance
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// Create the prisma instance
const prisma = global.prisma ?? prismaClientSingleton()

// Assign the prisma instance to global object in non-production environments
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
