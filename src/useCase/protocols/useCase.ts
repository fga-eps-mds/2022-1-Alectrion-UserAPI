export interface UseCaseReponse {
    isSuccess:Boolean;
    data: any;
}

export interface UseCase {
    execute(data: any): Promise<UseCaseReponse>;
}