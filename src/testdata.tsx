import { customerDataType, deviceDataType, serviceDataType, systemRoleDataType } from "./type";

export const deviceData: deviceDataType[] = [
    {
        key: 'KIO_01',
        code: 'KIO_01',
        name: 'Kiosk',
        type: 'Kiosk',
        ip: '192.168.1.10',
        status: 200,
        connect: 200,
        service: ['Khám tim mạch', 'Khám tai mũi họng'],
    },
    {
        key: 'KIO_02',
        code: 'KIO_02',
        name: 'Kiosk',
        type: 'Kiosk',
        ip: '192.168.1.10',
        status: 404,
        connect: 404,
        service: ['Khám mắt', 'Khám tim mạch'],
    },
    {
        key: 'KIO_03',
        code: 'KIO_03',
        name: 'Kiosk',
        type: 'Kiosk',
        ip: '192.168.1.10',
        status: 404,
        connect: 200,
        service: ['Khám tim mạch', 'Khám tai mũi họng'],
    },
    {
        key: 'KIO_04',
        code: 'KIO_04',
        name: 'Kiosk',
        type: 'Kiosk',
        ip: '192.168.1.10',
        status: 404,
        connect: 200,
        service: ['Khám mắt', 'Khám tim mạch'],
    },
    {
        key: 'KIO_05',
        code: 'KIO_05',
        name: 'Kiosk',
        type: 'Kiosk',
        ip: '192.168.1.10',
        status: 200,
        connect: 404,
        service: ['Khám tim mạch', 'Khám tai mũi họng'],
    },
    {
        key: 'KIO_06',
        code: 'KIO_06',
        name: 'Kiosk',
        type: 'Kiosk',
        ip: '192.168.1.10',
        status: 200,
        connect: 404,
        service: ['Khám mắt', 'Khám tim mạch'],
    },
    {
        key: 'KIO_07',
        code: 'KIO_07',
        name: 'Kiosk',
        type: 'Kiosk',
        ip: '192.168.1.10',
        status: 200,
        connect: 200,
        service: ['Khám tim mạch', 'Khám tai mũi họng'],
    },
    {
        key: 'KIO_08',
        code: 'KIO_08',
        name: 'Kiosk',
        type: 'Kiosk',
        ip: '192.168.1.10',
        status: 200,
        connect: 404,
        service: ['Khám mắt', 'Khám tim mạch'],
    },
    {
        key: 'KIO_09',
        code: 'KIO_09',
        name: 'Kiosk',
        type: 'Kiosk',
        ip: '192.168.1.10',
        status: 404,
        connect: 200,
        service: ['Khám tim mạch', 'Khám tai mũi họng'],
    },
    {
        key: 'KIO_10',
        code: 'KIO_10',
        name: 'Kiosk',
        type: 'Kiosk',
        ip: '192.168.1.10',
        status: 404,
        connect: 404,
        service: ['Khám mắt', 'Khám tim mạch'],
    },
    {
        key: 'KIO_11',
        code: 'KIO_11',
        name: 'Kiosk',
        type: 'Kiosk',
        ip: '192.168.1.10',
        status: 200,
        connect: 200,
        service: ['Khám tim mạch', 'Khám tai mũi họng'],
    },
    {
        key: 'KIO_12',
        code: 'KIO_12',
        name: 'Kiosk',
        type: 'Kiosk',
        ip: '192.168.1.10',
        status: 404,
        connect: 200,
        service: ['Khám mắt', 'Khám tim mạch'],
    }
]

// service Data
export const serviceData: serviceDataType[] = [
    {
        key: '201',
        code: '201',
        name: 'Khám tim mạch',
        desc: 'Đo lường các chỉ số cơ bản, Xét nghiệm máu đa phương diện, Khám lâm sàng tim mạch, Xét nghiệm điện tâm đồ (ECG), Tư vấn và đề xuất',
        status: 200,
        progRule: {
            auto: { start: '0001', end: '9999' },
            prefix: '0001',
            surfix: 'none',
            reset: false
        }
    },
    {
        key: '202',
        code: '202',
        name: 'Khám tổng quát',
        desc: 'Kiểm tra y tế tổng quát, Đo lường chỉ số cơ bản, Xét nghiệm máu cơ bản, Khám lâm sàng, Tư vấn và hướng dẫn',
        status: 404,
        progRule: {
            auto: { start: 'none', end: 'none' },
            prefix: '0001',
            surfix: 'none',
            reset: true
        }
    },
    {
        key: '203',
        code: '203',
        name: 'Khám phụ sản',
        desc: 'Kiểm tra sức khỏe phụ khoa, Siêu âm phụ khoa, Xét nghiệm âm đạo, Tư vấn về sức khỏe phụ nữ, Đề xuất điều trị và quản lý sức khỏe phụ sản',
        status: 200,
        progRule: {
            auto: { start: '0001', end: '9999' },
            prefix: '0001',
            surfix: 'none',
            reset: false
        }
    },

    {
        key: '204',
        code: '204',
        name: 'Khám hô hấp',
        desc: 'Kiểm tra chức năng hô hấp, Xét nghiệm chức năng phổi, Xét nghiệm dị ứng hô hấp, Điều trị cơ bản cho các vấn đề hô hấp, Tư vấn về làm sạch đường hô hấp',
        status: 200,
        progRule: {
            auto: { start: '0001', end: '9999' },
            prefix: '0001',
            surfix: 'none',
            reset: false
        }
    },
    {
        key: '205',
        code: '205',
        name: 'Khám tai mũi họng',
        desc: 'Khám tai mũi họng, Đo thính lực, Xét nghiệm vi khuẩn, Điều trị cơ bản cho các vấn đề tai mũi họng, Tư vấn và hướng dẫn về chăm sóc tai mũi họng',
        status: 200,
        progRule: {
            auto: { start: '0001', end: '9999' },
            prefix: '0001',
            surfix: '0001',
            reset: false
        }
    },
    {
        key: '206',
        code: '206',
        name: 'Khám răng hàm mặt',
        desc: 'Kiểm tra tình trạng răng và nướu, Tư vấn về chăm sóc răng miệng, Tạo kế hoạch điều trị nha khoa, Can thiệp răng sứ và chỉnh nha, Phẫu thuật răng hàm mặt (nếu cần)',
        status: 200,
        progRule: {
            auto: { start: 'none', end: 'none' },
            prefix: '0001',
            surfix: 'none',
            reset: true
        }
    },
    {
        key: '207',
        code: '207',
        name: 'Khám da liễu',
        desc: 'Kiểm tra da và tình trạng da liễu, Tư vấn về chăm sóc da hàng ngày, Đề xuất sản phẩm chăm sóc da, Điều trị các vấn đề da thường gặp, Tiến hành các thủ thuật da liễu (nếu cần)',
        status: 200,
        progRule: {
            auto: { start: '0001', end: '9999' },
            prefix: '0001',
            surfix: 'none',
            reset: false
        }
    },
    {
        key: '208',
        code: '208',
        name: 'Khám thai',
        desc: 'Kiểm tra tình trạng thai kỳ, Siêu âm thai để theo dõi sự phát triển của thai nhi, Xét nghiệm máu và xét nghiệm tiểu đường thai kỳ, Tư vấn về dinh dưỡng và chăm sóc sức khỏe thai kỳ, Đề xuất kế hoạch chăm sóc và chuẩn bị cho quá trình sinh',
        status: 404,
        progRule: {
            auto: { start: 'none', end: 'none' },
            prefix: '0001',
            surfix: 'none',
            reset: true
        }
    },
    {
        key: '209',
        code: '209',
        name: 'Khám mắt',
        desc: 'Kiểm tra thị lực và góc nhìn, Đo thị lực từ xa và gần, Thử kính đo thị lực, Tư vấn về chọn kính cận, kính lão và kính áp tròng, Điều trị và quản lý các vấn đề về mắt',
        status: 200,
        progRule: {
            auto: { start: '0001', end: '9999' },
            prefix: '0001',
            surfix: 'none',
            reset: false
        }
    },
    {
        key: '210',
        code: '210',
        name: 'Khám xương"',
        desc: 'Kiểm tra tình trạng xương và khớp, Xét nghiệm tia X để đánh giá xương, Tư vấn về chăm sóc xương và khớp, Đề xuất chế độ tập thể dục phù hợp, Điều trị và quản lý các vấn đề xương và khớp',
        status: 200,
        progRule: {
            auto: { start: '0001', end: '9999' },
            prefix: '0001',
            surfix: 'none',
            reset: false
        }
    }
]

export const customerData: customerDataType[] = [
    {
        key: '20230001',
        number: '20230001',
        name: 'Nguyễn Minh Hiếu',
        service: 'Khám tim mạch',
        time_get: '07:30-18/08/2023',
        time_expired: '12:00-24/08/2023',
        status: 404,
        source: 'Kiosk'
    },
    {
        key: '20230002',
        number: '20230002',
        name: 'Nguyễn Thị Hương',
        service: 'Khám phụ sản',
        time_get: '07:30-18/08/2023',
        time_expired: '12:00-24/08/2023',
        status: 200,
        source: 'Kiosk'
    },
    {
        key: '20230003',
        number: '20230003',
        name: 'Lê Quang Minh',
        service: 'Khám tổng quát',
        time_get: '07:30-18/08/2023',
        time_expired: '12:00-24/08/2023',
        status: 200,
        source: 'Hệ thống'
    },
    {
        key: '20230004',
        number: '20230004',
        name: 'Trần Bảo An',
        service: 'Khám răng hàm mặt',
        time_get: '07:30-18/08/2023',
        time_expired: '12:00-24/08/2023',
        status: 200,
        source: 'Kiosk'
    },
    {
        key: '20230005',
        number: '20230005',
        name: 'Phạm Đình Hải',
        service: 'Khám xương',
        time_get: '07:30-18/08/2023',
        time_expired: '12:00-24/08/2023',
        status: 300,
        source: 'Kiosk'
    },
    {
        key: '20230006',
        number: '20230006',
        name: 'Vũ Thị Mai',
        service: 'Khám thai',
        time_get: '07:30-18/08/2023',
        time_expired: '12:00-24/08/2023',
        status: 200,
        source: 'Kiosk'
    },
    {
        key: '20230007',
        number: '20230007',
        name: 'Đặng Văn Tuấn',
        service: 'Khám tim mạch',
        time_get: '07:30-18/08/2023',
        time_expired: '12:00-24/08/2023',
        status: 200,
        source: 'Hệ thống'
    },
    {
        key: '20230008',
        number: '20230008',
        name: 'Lý Ngọc Linh',
        service: 'Khám mắt',
        time_get: '07:30-18/08/2023',
        time_expired: '12:00-24/08/2023',
        status: 404,
        source: 'Hệ thống'
    },
    {
        key: '20230009',
        number: '20230009',
        name: 'Hoàng Minh Tuệ',
        service: 'Khám mắt',
        time_get: '07:30-18/08/2023',
        time_expired: '12:00-24/08/2023',
        status: 200,
        source: 'Kiosk'
    },
    {
        key: '20230010',
        number: '20230010',
        name: 'Ngô Văn Khánh',
        service: 'Khám tổng quát',
        time_get: '07:30-18/08/2023',
        time_expired: '12:00-24/08/2023',
        status: 300,
        source: 'Kiosk'
    },
    {
        key: '20230011',
        number: '20230011',
        name: 'Trần Thị Thu',
        service: 'Khám tổng quát',
        time_get: '07:30-18/08/2023',
        time_expired: '12:00-24/08/2023',
        status: 200,
        source: 'Kiosk'
    },
    {
        key: '20230012',
        number: '20230012',
        name: 'Bùi Văn Đức',
        service: 'Khám hô hấp',
        time_get: '07:30-18/08/2023',
        time_expired: '12:00-24/08/2023',
        status: 200,
        source: 'Kiosk'
    },
]

export const systemRoleData: systemRoleDataType[] = [
    {
        key: 'Bác sĩ',
        name: 'Bác sĩ',
        desc: 'Thực hiện nhiệm vụ điều trị trực tiếp tại bệnh viện',
        role: {
            A: {
                device: true,
                service: true,
                customer: true
            },
            B: {
                role: false,
                account: false
            }
        }

    },
    {
        key: 'Kế toán',
        name: 'Kế toán',
        desc: 'Thực hiện nhiệm vụ thống kê và tổng hợp số liệu',
        role: {
            A: {
                device: true,
                service: true,
                customer: false
            },
            B: {
                role: false,
                account: false
            }
        }
    },
    {
        key: 'Lễ tân',
        name: 'Lễ tân',
        desc: 'Thực hiện nhiệm vụ tiếp và cấp số bệnh nhân',
        role: {
            A: {
                device: false,
                service: false,
                customer: true
            },
            B: {
                role: false,
                account: false
            }
        }
    },
    {
        key: 'Admin',
        name: 'Admin',
        desc: 'Thực hiện nhiệm vụ quản lý hệ thống ',
        role: {
            A: {
                device: true,
                service: true,
                customer: true
            },
            B: {
                role: true,
                account: true
            }
        }

    }
]

export const historyData = [
    {
        username: 'minhhieu',
        time: '02/20/2000',
        ip: '192.168.1.1',
        action: 'Cập nhật dịch vụ 13:45 21/08/2023'
    },
]