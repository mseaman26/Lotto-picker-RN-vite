export const getLottoPicksByUserId = async (userId: string) => {

    const response = await fetch(`https://lotto-server-next.vercel.app/api/lottopicks/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

