import { useState } from 'react';

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

type UseMutationResult = [(data: any) => void, UseMutationState];

export default function useMutation(endpoint: string): UseMutationResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<object | undefined>(undefined);
  const [error, setError] = useState<any | undefined>(undefined);

  async function mutation(data: object) {
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setData(await response.json());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  return [mutation, { loading, data, error }];
}
