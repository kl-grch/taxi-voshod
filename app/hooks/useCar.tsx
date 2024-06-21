import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export function useCar(id: string) {
  const { data, error, isLoading } = useSWR(
    `https://test.taxivoshod.ru/api/test/?w=catalog-car&id=${id}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
}
