import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -22.2508414,
      longitude: -45.7024668,
      description: null,
      phone: null,
    })
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -22.23018,
      longitude: -45.9328447,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.23018,
      userLongitude: -45.9328447,
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })

  it('should be able to fetch nearby gyms using pagination', async () => {
    for (let index = 1; index <= 22; index++) {
      await gymsRepository.create({
        title: `Near Gym ${index}`,
        latitude: -22.23018,
        longitude: -45.9328447,
        description: null,
        phone: null,
      })
    }
    await gymsRepository.create({
      title: 'Far Gym 23',
      latitude: -22.2508414,
      longitude: -45.7024668,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.23018,
      userLongitude: -45.9328447,
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym 21' }),
      expect.objectContaining({ title: 'Near Gym 22' }),
    ])
  })
})
