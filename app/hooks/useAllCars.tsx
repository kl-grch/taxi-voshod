import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export function useAllCars(page: number = 1, filter?: string) {
  const { data, error, isLoading } = useSWR(
    filter !== undefined
      ? `https://test.taxivoshod.ru/api/test/?w=catalog-cars${filter}&page=${page}`
      : `https://test.taxivoshod.ru/api/test/?w=catalog-cars&page=${page}`,

    fetcher
  );

  return {
    allCars: data,
    error,
    isLoading,
  };
}
