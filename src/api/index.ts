import type { ItemRegistrationRequest } from '@/types'
import axios from 'axios'

const BASE_URL = 'https://web.zaico.co.jp/api/v1'
const INVENTORIES_URL = `${BASE_URL}/inventories`

const client = axios.create({
  headers: {
    Authorization: 'Bearer ' + `${import.meta.env.VITE_API_TOKEN}`,
  },
})

export const fetchInventory = () => client.get(INVENTORIES_URL)

export const fetchInventoryDetail = (id: string) =>
  client.get(`${INVENTORIES_URL}/${id}`)

export const registerItem = (request: ItemRegistrationRequest) =>
  client.post(INVENTORIES_URL, request)
