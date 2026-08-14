const request = async <T>(
  url: string,
  config?: RequestInit,
): Promise<{ data: T; response: Response }> => {
  const response = await fetch(url, config);
  const data = await response.json();

  if (response.status >= 400) {
    throw { data, response };
  }

  return { data, response };
};

export default request;
