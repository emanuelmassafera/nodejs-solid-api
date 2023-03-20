import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JS Gym',
      latitude: -22.23018,
      longitude: -45.9328447,
      description: null,
      phone: null,
    })
    await gymsRepository.create({
      title: 'TS Gym',
      latitude: -22.23018,
      longitude: -45.9328447,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JS Gym' })])
  })

  it('should be able to to search for gyms using pagination', async () => {
    for (let index = 1; index <= 22; index++) {
      await gymsRepository.create({
        title: `JS Gym ${index}`,
        latitude: -22.23018,
        longitude: -45.9328447,
        description: null,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JS Gym 21' }),
      expect.objectContaining({ title: 'JS Gym 22' }),
    ])
  })
})
