import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    gymsRepository.items.push({
      id: 'any_id',
      title: 'any_title',
      latitude: new Decimal(-22.2508414),
      longitude: new Decimal(-45.7024668),
      description: '',
      phone: '',
    })
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should not be able to check in on a distant gym', async () => {
    gymsRepository.items.push({
      id: 'another_id',
      title: 'any_title',
      latitude: new Decimal(-22.23018),
      longitude: new Decimal(-45.9328447),
      description: '',
      phone: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'another_id',
        userId: 'any_id',
        userLatitude: -22.2508414,
        userLongitude: -45.7024668,
      }),
    ).rejects.toBeInstanceOf(Error)
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
    ).rejects.toBeInstanceOf(Error)
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
