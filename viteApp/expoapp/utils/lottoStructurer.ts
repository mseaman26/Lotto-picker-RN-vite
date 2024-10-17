import type { LottoStructure } from "../interfaces/interfaces"
export interface LottoNumber{
    setIndex: number
    color: string
}

export type LottoSet = [number, number]

export const lottoStructurer = (lotto: string) => {

    let structure: LottoStructure = {
        title: '',
        numbers: [],
        sets: []
    }

    if(lotto === 'powerball'){
        structure = {
            title: 'Powerball',
            sets: [
                [1, 69],
                [1, 26]
            ],
            numbers: [
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'red', setIndex: 1}
            ],
            
        }
    }else if(lotto === 'megamillions'){
        structure = {
            title: 'Mega Millions',
            sets: [
                [1, 70],
                [1, 25]
            ],
            numbers: [
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'white', setIndex: 0},
                {color: 'gold', setIndex: 1}
            ]
        }
    }

    return structure
}