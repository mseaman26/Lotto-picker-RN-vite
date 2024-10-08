export const lottoStructurer = (lotto: string) => {

    interface LottoNumber{
        min: number,
        max: number,
    }

    let structure: LottoNumber[] = []

    if(lotto === 'powerball'){
        structure = [
            {min: 1, max: 69},
            {min: 1, max: 69},
            {min: 1, max: 69},
            {min: 1, max: 69},
            {min: 1, max: 26}
        ]
    }

    return structure
}