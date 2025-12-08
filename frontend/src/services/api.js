const API_URL = "http://localhost:4000/api/sales";

export async function fetchSales(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${API_URL}?${query}` : API_URL;

  const res = await fetch(url);
  if (!res.ok) throw new Error("API error");

  return await res.json();
}
