import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JS Gym',
        latitude: -22.2508414,
        longitude: -45.7024668,
        description: 'any_description',
        phone: 'any_phone',
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TS Gym',
        latitude: -22.23018,
        longitude: -45.9328447,
        description: 'any_description',
        phone: 'any_phone',
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -22.2508414,
        longitude: -45.7024668,
        page: '1',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JS Gym',
      }),
    ])
  })
})
