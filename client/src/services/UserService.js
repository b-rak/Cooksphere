import Cookies from "js-cookie";
const BASE_URL = "http://localhost:3000";

async function makeServerRequest(endpoint, options) {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    return await response.json();
  } catch (error) {
    throw new Error(`API Error: ${error}`);
  }
}

const login = async ({ email, password }) => {
  try {
    return await makeServerRequest("user/authenticate", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    throw new Error(e);
  }
};

const getUser = async () => {
  try {
    return await makeServerRequest("user");
  } catch (e) {
    throw new Error(e);
  }
};

export { getUser, login };
