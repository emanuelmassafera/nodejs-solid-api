import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role: 'ADMIN' | 'MEMBER' = 'MEMBER',
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@mail.com',
      password_hash: await hash('any_password', 6),
      role,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john@mail.com',
    password: 'any_password',
  })

  const { token } = authResponse.body

  return { token }
}
