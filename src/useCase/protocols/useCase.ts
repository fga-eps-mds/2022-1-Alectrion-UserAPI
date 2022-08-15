export interface UseCaseReponse<T> {
  isSuccess: boolean
  data?: T
  error?: Error
}

export interface UseCase<T> {
  execute(data: any): Promise<UseCaseReponse<T>>
}
