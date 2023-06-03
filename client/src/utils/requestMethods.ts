import axios from "axios";


const BASE_URL = "http://localhost:5000/api"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzRjYjQ1YjIxNzEwODNhNjhhMDlmMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NTgwNjE2MCwiZXhwIjoxNjg2MDY1MzYwfQ.qWRCtMEtaTpAolctoLxtWFQuXlT-9mhIUAuMHwBV72Y"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
})
