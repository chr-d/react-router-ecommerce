const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Response(`HTTP error! Status: ${response.status}`, {
      status: response.status,
    });
  }

  return response.json();
};

export { fetchData };
