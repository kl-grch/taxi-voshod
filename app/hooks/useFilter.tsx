import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export function useFilter() {
  const { data, error, isLoading } = useSWR(
    `https://test.taxivoshod.ru/api/test/?w=catalog-filter`,
    fetcher
  );

  return {
    filters: data,
    error,
    isLoading,
  };
}
