import { LottoPicksResponse } from "../interfaces/interfaces";


export const getLottoPicksByUserId = async (userId: string): Promise<LottoPicksResponse> => {
    const response = await fetch(`https://lotto-server-next.vercel.app/api/lottopicks/${userId}`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: unknown = await response.json(); // Use unknown to enforce type checking later

    return data as LottoPicksResponse;
};

export const saveLottoPick = async (userId: string, gameName: string, numbers: number[]): Promise<LottoPicksResponse> => {
    const response = await fetch(`https://lotto-server-next.vercel.app/api/lottopicks/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameName, numbers }),
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

export const isPickUnique = async (gameName: string, numbers: number[]): Promise<IsUniqueResponse> => {
    const response = await fetch(`https://lotto-server-next.vercel.app/api/lottopicks/isunique`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameName, numbers }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: unknown = await response.json(); // Use unknown to enforce type checking later

    return data as IsUniqueResponse;
}

