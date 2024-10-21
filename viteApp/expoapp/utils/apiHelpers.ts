import { LottoPicksResponse } from "../interfaces/interfaces";

const baseURL = 'https://lotto-server-next.vercel.app/api';


export const getLottoPicksByUserId = async (userId: string): Promise<LottoPicksResponse> => {
    const response = await fetch(`${baseURL}/lottopicks/${userId}`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: unknown = await response.json(); // Use unknown to enforce type checking later

    return data as LottoPicksResponse;
};

export const saveLottoPick = async (userId: string, gameName: string, numbers: number[], drawDate: Date | null): Promise<LottoPicksResponse> => {
    const response = await fetch(`${baseURL}/lottopicks/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameName, numbers, drawDate }),
    });

    if (!response.ok) {
        return { data: [], success: false };
    }

    const data: unknown = await response.json(); // Use unknown to enforce type checking later

    return data as LottoPicksResponse;
}

interface IsUniqueResponse {
    success: boolean;
    data: boolean;
}

export const isPickUnique = async (gameName: string, numbers: number[], drawDate: Date | null): Promise<IsUniqueResponse> => {
    const response = await fetch(`${baseURL}/lottopicks/isunique`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameName, numbers, drawDate }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: unknown = await response.json(); // Use unknown to enforce type checking later

    return data as IsUniqueResponse;
}

interface GenerateUniqueResponse {
    success: boolean;
    data: number[];
    tries: number;
}

export const generateUniqe = async (gameName: string, drawDate: Date | null): Promise<GenerateUniqueResponse> => {
    const response = await fetch(`${baseURL}/lottopicks/generateunique`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameName, drawDate }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: unknown = await response.json(); // Use unknown to enforce type checking later

    return data as GenerateUniqueResponse;
}


