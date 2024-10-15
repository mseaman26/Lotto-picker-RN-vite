export interface LottoPickData{
    createdAt: string,
    gameName: string,
    numbers: number[],
    updatedAt: string,
    __v: number,
    _id: string
}

export interface LottoPicksResponse{
    data: LottoPickData[]
    success: boolean
}