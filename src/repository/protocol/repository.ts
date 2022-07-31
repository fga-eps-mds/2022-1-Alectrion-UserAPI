export interface Repository {
    updateOne(userData: any): Promise<Boolean>;
    findOne(userId: string): Promise<any>;
    

}