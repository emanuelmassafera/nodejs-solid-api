import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    const MAX_DISTANCE_IN_MINUTES_FROM_CHECK_IN_CREATION = 20

    if (
      distanceInMinutesFromCheckInCreation >
      MAX_DISTANCE_IN_MINUTES_FROM_CHECK_IN_CREATION
    ) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    const updatedCheckIn = await this.checkInsRepository.save(checkIn)

    return {
      checkIn: updatedCheckIn,
    }
  }
}
