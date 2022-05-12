import { useState } from 'react';

export default function useMutation(
  endpoint: string
): [
  (data?: any) => void,
  { loading: boolean; data: any | undefined; error: any | undefined }
] {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  function mutation(data: object) {}
  return [mutation, { loading, data, error }];
}
