import React, { useState, useEffect } from 'react'
import './chart.css'
import { IoMdArrowDropdown } from 'react-icons/io'
// chart js
import { Line } from 'react-chartjs-2'
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js'
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from 'chart.js';
import { lineChartDataType } from '../../../type'
import { useAppDispatch, useAppSelector } from '../../../Redux/store'
import { fetchCustomer } from '../../../Redux/slice/customerSlice'
import dayjs from 'dayjs'
Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, ArcElement, Tooltip, Legend)


const createGradient = () => {
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx) return
    const gradient = ctx.createLinearGradient(0, 0, 0, 300)
    gradient.addColorStop(0, 'rgba(81, 133, 247, 1)')
    gradient.addColorStop(1, 'rgba(81, 133, 247, 0)')

    return gradient
}

function Chart({ currDate }: any) {
    const customerList = useAppSelector(state => state.customer.customerList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCustomer())
    }, [dispatch])

    const [activeOptions, setActiveOptions] = useState<boolean>(false)
    const [chartOption, setChartOption] = useState<string>('Ngày')

    const daysInMonth = currDate.daysInMonth()

    useEffect(() => {
        if (chartOption === 'Ngày') {
            setData(dateData)
        }
        if (chartOption === 'Tuần') {
            setData(weekData)
        }
        if (chartOption === 'Tháng') {
            setData(monthData)
        }
    }, [currDate])

    const dateData: lineChartDataType = {
        labels: Array.from({ length: daysInMonth }, (x, index) => String(index + 1)),
        datasets: [
            {
                label: 'Số đã cấp',
                data: Array.from({ length: 31 }, (x, index) => {
                    // return Math.floor(Math.random() * 4000) + 2000
                    const customerDateList = customerList.filter(cus => {
                        return (dayjs(cus.time_get, 'HH:mm-DD/MM/YYYY').date() === index &&
                            dayjs(cus.time_get, 'HH:mm-DD/MM/YYYY').month() === currDate.month() &&
                            dayjs(cus.time_get, 'HH:mm-DD/MM/YYYY').year() === currDate.year()
                        )
                    })
                    return customerDateList.length
                }),
                fill: true,
                borderColor: 'rgba(81, 133, 247, 1)',
                backgroundColor: createGradient(),
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                tension: 0.5,
            }
        ],
    };
    const weekData: lineChartDataType = {
        labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
        datasets: [
            {
                label: 'Số đã cấp',
                data: [0, 1, 2, 1],
                fill: true,
                borderColor: 'rgba(81, 133, 247, 1)',
                backgroundColor: createGradient(),
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                tension: 0.5,
            }
        ],
    };
    const monthData: lineChartDataType = {
        labels: Array.from({ length: 12 }, (_, index) => 'Tháng ' + String(index + 1)),
        datasets: [
            {
                label: 'Số đã cấp',
                data: Array.from({ length: 12 }, (x, index) => {
                    if (index === 7) {
                        return 6
                    }
                    return 0
                }),
                fill: true,
                borderColor: 'rgba(81, 133, 247, 1)',
                backgroundColor: createGradient(),
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                tension: 0.5,
            }
        ],
    };
    // set data
    const [data, setData] = useState<lineChartDataType>(dateData)
    const handleChartOptions = (option: string) => {
        setChartOption(option)
        if (option === 'Ngày') setData(dateData)
        if (option === 'Tuần') setData(weekData)
        if (option === 'Tháng') setData(monthData)
        setActiveOptions(false)
    }

    const options = {
        scales: {
            x: {
                grid: {
                    display: false, // Tắt lưới dọc (trục y)
                    color: 'red',
                },
            },
            y: {
                grid: {
                    display: true,
                    color: 'rgba(0,0,0,0.08)',
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 1000, // Khoảng cách giữa các giá trị trên trục y,,
                    max: 8000,
                    beginAtZero: true,
                }
            },
        },
        plugins: {
            legend: {
                display: false, // tắt label
            },
        },
    };

    return (
        <div className='chart'>
            <div className="chart_top">
                <div className="chart_title">
                    <h3>Bảng thống kê theo {chartOption.toLowerCase()}</h3>
                    {chartOption === 'Ngày' || chartOption === 'Tuần' ?
                        <span>Tháng {currDate.month() + 1}/{currDate.year()}</span> :
                        <span>Năm 2023</span>
                    }
                </div>
                <div className="chart_options">
                    <span>Xem theo</span>
                    <div className='dropdown chart_dropdown' onClick={() => setActiveOptions(!activeOptions)}>
                        {chartOption}
                        <IoMdArrowDropdown />
                        <div className={!activeOptions ? "dropdown_list hide" : "dropdown_list "}>
                            <span onClick={() => handleChartOptions('Ngày')}>Ngày</span>
                            <span onClick={() => handleChartOptions('Tuần')}>Tuần</span>
                            <span onClick={() => handleChartOptions('Tháng')}>Tháng</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="chart_line">
                <Line
                    data={data}
                    options={options} />
            </div>

        </div>
    )
}

export default Chart
