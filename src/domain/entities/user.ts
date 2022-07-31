/* eslint-disable no-unused-vars */
export enum Job {
  DEL = 'admin',
  GENERIC = 'undefined'
}
export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  DEFAULT = 'default'
}
export type User = {
  id: string

  name: string

  email: string

  username: string

  job: Job

  role: Role

  password: string

  createdAt: Date

  updatedAt: Date
}
