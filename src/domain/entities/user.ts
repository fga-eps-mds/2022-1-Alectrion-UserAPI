/* eslint-disable no-unused-vars */

import { Job } from '../../db/entities/userEnum/job'
import { Role } from '../../db/entities/userEnum/role'

export type User = {
  id?: string

  name: string

  email: string

  username: string

  job: Job

  role: Role

  password: string

  createdAt?: Date

  updatedAt?: Date

  deletedAt?: Date

  isDeleted?: boolean

  firstLogin: boolean
}
