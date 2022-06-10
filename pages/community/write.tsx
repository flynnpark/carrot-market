import type { NextPage } from 'next';
import Button from 'components/button';
import Layout from 'components/layout';
import TextArea from 'components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from 'libs/client/useMutation';
import { useEffect } from 'react';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import useCoords from 'libs/client/useCoords';

interface WriteForm {
  content: string;
}

interface WriteResponse {
  success: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const coords = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>('/api/posts');
  const onValid = (data: WriteForm) => {
    if (loading) return;
    console.log(coords);
    post({ ...data, ...coords });
  };

  useEffect(() => {
    if (data?.success) {
      router.push('/community/[id]', `/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Write Post">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <TextArea
          required
          placeholder="Ask a question!"
          register={register('content', { required: true, minLength: 5 })}
        />
        <Button text={loading ? 'Loading...' : 'Submit'} />
      </form>
    </Layout>
  );
};

export default Write;
