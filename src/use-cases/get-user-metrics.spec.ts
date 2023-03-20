import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'any_id',
      user_id: 'any_id',
    })
    await checkInsRepository.create({
      gym_id: 'another_id',
      user_id: 'any_id',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'any_id',
    })

    expect(checkInsCount).toEqual(2)
  })
})
