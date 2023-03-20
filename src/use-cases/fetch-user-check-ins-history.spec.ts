import { expect, describe, it, beforeEach } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-ins History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-ins history', async () => {
    await checkInsRepository.create({
      gym_id: 'any_id',
      user_id: 'any_id',
    })
    await checkInsRepository.create({
      gym_id: 'another_id',
      user_id: 'any_id',
    })

    const { checkIns } = await sut.execute({
      userId: 'any_id',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'any_id' }),
      expect.objectContaining({ gym_id: 'another_id' }),
    ])
  })

  it('should be able to fetch paginated check-ins history', async () => {
    for (let index = 1; index <= 22; index++) {
      await checkInsRepository.create({
        gym_id: `gym_${index}`,
        user_id: 'any_id',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'any_id',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym_21' }),
      expect.objectContaining({ gym_id: 'gym_22' }),
    ])
  })
})
