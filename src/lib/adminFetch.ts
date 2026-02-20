export async function adminFetch(
  input: RequestInfo,
  init: RequestInit = {}
) {
  const token = localStorage.getItem("admin_token");

  return fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}
