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

interface StructureNumber{
    color: string,
    setIndex: number    
}
export interface LottoStructure{
    title: string,
    numbers: StructureNumber[],
    sets: ([number, number])[],
    days: number[]
}