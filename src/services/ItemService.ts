import axios from "axios";
import { Item } from "../types/Item";

const BASE_URL = "https://67502b6b69dc1669ec19f625.mockapi.io/api/items"; // mock api url


export const getItems = async (): Promise<Item[]> => {
  const response = await axios.get<Item[]>(BASE_URL);
  return response.data;
};

export const getItem = async (id: number): Promise<Item> => {
  const response = await axios.get<Item>(`${BASE_URL}/${id}`);
  return response.data;
};

export const createItem = async (item: Item): Promise<Item> => {
  const response = await axios.post<Item>(BASE_URL, item);
  return response.data;
};

export const updateItem = async (id: number | string, item: Item): Promise<Item> => {
  const response = await axios.put<Item>(`${BASE_URL}/${id}`, item);
  return response.data;
};

export const deleteItem = async (id: number | string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
