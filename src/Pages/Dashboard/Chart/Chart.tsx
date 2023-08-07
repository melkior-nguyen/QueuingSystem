import React, { useState } from 'react'
import './chart.css'
import { IoMdArrowDropdown } from 'react-icons/io'
// chart js
import { Line } from 'react-chartjs-2'
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js'
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from 'chart.js';
import { lineChartDataType } from '../../../type'
Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, ArcElement, Tooltip, Legend)


const createGradient = () => {
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx) return
    const gradient = ctx.createLinearGradient(0, 0, 0, 300)
    gradient.addColorStop(0, 'rgba(81, 133, 247, 1)')
    gradient.addColorStop(1, 'rgba(81, 133, 247, 0)')

    return gradient
}

function Chart() {
    const [activeOptions, setActiveOptions] = useState<boolean>(false)
    const [chartOption, setChartOption] = useState<string>('Ngày')

    const handleChartOptions = (option: string) => {
        setChartOption(option)
        if (option === 'Ngày') setData(dateData)
        if (option === 'Tuần') setData(weekData)
        if (option === 'Tháng') setData(monthData)
        setActiveOptions(false)
    }

    const array = []
    const dateData: lineChartDataType = {
        labels: Array.from({ length: 31 }, (_, index) => String(index + 1)),
        datasets: [
            {
                label: 'Số đã cấp',
                data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 4000) + 2000),
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
                data: [1200, 3100, 2500, 3000],
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
                data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 4000) + 2000),
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
                        <span>Tháng 8/2023</span> :
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
