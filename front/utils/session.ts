import { headers as requestHeaders } from "next/headers";

export async function auth() {
  try {
    
    const headers = await requestHeaders();

    const rq = await fetch(`http://localhost:3000/api/auth/session`, {
      credentials: "include",
      headers
    })

    if (!rq.ok) {
      return null;
    }

    const rs = await rq.json();

    return rs;

  }catch (e) {
    console.error(e);
    throw new Error('Failed to get session')
  }
}