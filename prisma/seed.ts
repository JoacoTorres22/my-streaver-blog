import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Borrar datos anteriores para evitar conflictos
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  const usersRes = await fetch('https://jsonplaceholder.typicode.com/users')
  const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts')
  const users = await usersRes.json()
  const posts = await postsRes.json()

  console.log('Sembrando datos...')

  for (const u of users) {
    await prisma.user.create({
      data: {
        id: u.id,
        name: u.name,
        username: u.username,
        email: u.email
      }
    })
  }

  for (const p of posts) {
    await prisma.post.create({
      data: {
        id: p.id,
        title: p.title,
        body: p.body,
        userId: p.userId
      }
    })
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })