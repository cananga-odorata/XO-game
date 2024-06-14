import axios from 'axios';
import { url } from '../config';


export const createHistory = async (data: any) => {
    console.log(data)
    // console.log(`${url}/api/save-`)
    try {
        const history = await axios.post(`${url}/api/save-game`, {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return history.data;
    } catch (err) {
        console.error('Error creating history:', err);
        throw new Error('เกิดข้อผิดพลาด create history')
    }

}

export const getHistory = async () => {
    try {
        const getData = await axios.get(`${url}/api/get-history`);
        // const encryption = getData.data;
        return (getData)
    } catch (err) {
        throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
}