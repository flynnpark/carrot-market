import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface ProfileResponse {
  success: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>('/api/users/me');
  const router = useRouter();

  useEffect(() => {
    if (!data?.success) {
      router.replace('/enter');
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !error && !data };
}
