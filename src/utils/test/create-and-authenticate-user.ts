import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john@mail.com',
    password: 'any_password',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john@mail.com',
    password: 'any_password',
  })

  const { token } = authResponse.body

  return { token }
}
