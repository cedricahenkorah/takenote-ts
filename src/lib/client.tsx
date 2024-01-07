import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface Note {
  title: string;
  label: string;
  body: string;
}

export async function createNote(note: Note, token: string) {
  try {
    const { data } = await axios.post(`${SERVER_URL}/notes`, note, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}

export async function getNotes(token: string) {
  try {
    const { data } = await axios.get(`${SERVER_URL}/notes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}
