export interface UseCaseReponse<T> {
  isSuccess: Boolean
  data?: T
  error?: Error
}

export interface UseCase<T> {
  execute(data: any): Promise<UseCaseReponse<T>>
}
