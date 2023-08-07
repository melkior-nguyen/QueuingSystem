export type userType = {
    id: number,
    name: string,
    email: string,
    username: string,
    password: string,
    role: string,
    telephone: number,
    avatar: string
}

// line chart
export type lineChartDataType = {
    labels: string[],
    datasets: {
        label: string,
        data: number[],
        fill: boolean,
        borderColor: string,
        backgroundColor: CanvasGradient | undefined,
        pointBorderColor: string,
        pointBackgroundColor: string,
        tension: number,
    }[]
}