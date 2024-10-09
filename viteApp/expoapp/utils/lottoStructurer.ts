export const lottoStructurer = (lotto: string) => {

    interface LottoNumber{
        min: number,
        max: number,
        color: string
    }


    let structure: {
        title: string,
        numbers: LottoNumber[]
    } 

    if(lotto === 'powerball'){
        structure = {
            title: 'Powerball',
            numbers: [
                {min: 1, max: 69, color: 'white'},
                {min: 1, max: 69, color: 'white'},
                {min: 1, max: 69, color: 'white'},
                {min: 1, max: 69, color: 'white'},
                {min: 1, max: 26, color: 'red'}
            ]
        }
    }else if(lotto === 'megamillions'){
        structure = {
            title: 'Mega Millions',
            numbers: [
                {min: 1, max: 70, color: 'white'},
                {min: 1, max: 70, color: 'white'},
                {min: 1, max: 70, color: 'white'},
                {min: 1, max: 70, color: 'white'},
                {min: 1, max: 25, color: 'gold'}
            ]
        }
    }

    return structure
}