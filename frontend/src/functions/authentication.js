const fetchCurrentUser = async (token) => {
  console.log("token fetch user function:", token);
  const response = await fetch(
    "http://127.0.0.1:8000/events/auth/current_user/",
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log("data from auth/current_user:", data);
  if (response.ok) {
    sessionStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

export { fetchCurrentUser };
