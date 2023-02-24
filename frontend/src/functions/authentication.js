const fetchCurrentUser = async () => {
  const response = await fetch(
    "http://127.0.0.1:8000/events/auth/current_user/"
  );
  const data = await response.json();
  if (response.ok) {
    sessionStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

export { fetchCurrentUser };
