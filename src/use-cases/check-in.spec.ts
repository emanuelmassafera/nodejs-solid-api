import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    await gymsRepository.create({
      id: 'any_id',
      title: 'JS Gym',
      latitude: -22.2508414,
      longitude: -45.7024668,
      description: null,
      phone: null,
    })

    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should not be able to check in on a distant gym', async () => {
    await gymsRepository.create({
      id: 'another_id',
      title: 'any_title',
      latitude: -22.23018,
      longitude: -45.9328447,
      description: null,
      phone: null,
    })

    await expect(() =>
      sut.execute({
        gymId: 'another_id',
        userId: 'any_id',
        userLatitude: -22.2508414,
        userLongitude: -45.7024668,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'any_id',
      userId: 'any_id',
      userLatitude: -22.2508414,
      userLongitude: -45.7024668,
    })

    await expect(() =>
      sut.execute({
        gymId: 'any_id',
        userId: 'any_id',
        userLatitude: -22.2508414,
        userLongitude: -45.7024668,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice on different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'any_id',
      userId: 'any_id',
      userLatitude: -22.2508414,
      userLongitude: -45.7024668,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'any_id',
      userId: 'any_id',
      userLatitude: -22.2508414,
      userLongitude: -45.7024668,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'any_id',
      userId: 'any_id',
      userLatitude: -22.2508414,
      userLongitude: -45.7024668,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
