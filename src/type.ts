// user
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

//  device data
export type deviceDataType = {
    key: string,
    code: string,
    name: string,
    type: string,
    ip: string,
    status: number,
    connect: number,
    service: string[],
}

//progression rule
export type progressionRuleType = {
    auto: { start: string, end: string },
    prefix: string,
    surfix: string,
    reset: boolean
}



//  service data
export type serviceDataType = {
    key: string,
    code: string,
    name: string,
    desc: string
    status: number,
    progRule: progressionRuleType
}