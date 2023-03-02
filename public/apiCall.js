export const apiCall = async (query, variables) => {
  const response = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
    method: "post",
    body: JSON.stringify({ query, variables }),
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": "blockursdb",
    },
  });

  return await response.json();
};
