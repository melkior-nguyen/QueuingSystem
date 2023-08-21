// user
export type userType = {
    id: number,
    name: string,
    email: string,
    username: string,
    password: string,
    role: string,
    telephone: string,
    avatar: string,
    status: number
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

// customer data

export type customerDataType = {
    key: string,
    number: string,
    name: string,
    service: string,
    time_get: string,
    time_expired: string,
    status: number,
    source: string
}

// system role data

export type systemRoleDataType = {
    key: string,
    name: string,
    desc: string,
    role: {
        A: {
            device: boolean,
            service: boolean,
            customer: boolean
        }
        B: {
            role: boolean,
            account: boolean
        }
    }
}

