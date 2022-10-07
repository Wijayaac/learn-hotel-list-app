import axios from "axios"

import { API_URL } from '../../constants/API'

export const getHotels = async (setHotels, setLoading) => {
    try {
        let { data } = await axios.get(`${API_URL}/hotels`)
        setHotels(data)
        setLoading(false)
    } catch (error) {
        console.log(error)
    }
}