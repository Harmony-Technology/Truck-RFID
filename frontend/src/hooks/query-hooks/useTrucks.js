import { useQuery } from '@tanstack/react-query';
import { COMMON_STALE_TIME } from '@/lib/globals';
import HttpClient from '../../stores/http_store';

export async function getTrucks() {
  const url = `${HttpClient.base_url}/data`;
  return HttpClient.get(url).then((response) => {
    if (response && response.status === 200) {
      const truck = response.data;
      console.log(url);
      // console.log(truck)
      return Promise.resolve(truck);
    }
    return Promise.reject(null);
  });
}

export function useTrucks() {
  return useQuery({
    queryKey: ['trucks'],
    queryFn: getTrucks,
    staleTime: COMMON_STALE_TIME,
  });
}
