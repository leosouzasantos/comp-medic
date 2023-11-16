import { prisma } from './client'

async function main() {
  await prisma.user.create({
    data: {
      name: 'admin',
      password: 'admin',
      username: 'admin',
      isAdmin: true,
    },
  })
}

main()
