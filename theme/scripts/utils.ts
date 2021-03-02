export const handleFetchJSONResponse = async response => {
  const json = await response.json();
  if (response.status > 299) throw json;
  return json;
};