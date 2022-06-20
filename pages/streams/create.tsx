import type { NextPage } from 'next';
import Button from 'components/button';
import Input from 'components/input';
import Layout from 'components/layout';
import TextArea from 'components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from 'libs/client/useMutation';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';

interface CreateForm {
  name: string;
  description: string;
  price: number;
}

interface CreateResponse {
  success: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateForm>();
  const [createStream, { loading, data }] =
    useMutation<CreateResponse>('/api/streams');

  const onValid = (form: CreateForm) => {
    if (loading) return;
    createStream(form);
  };

  useEffect(() => {
    if (data?.success) {
      router.push('/streams/[id]', `/streams/${data.stream.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Go Stream">
      <form className=" space-y-4 py-10 px-4" onSubmit={handleSubmit(onValid)}>
        <Input
          required
          label="Name"
          name="name"
          type="text"
          register={register('name', { required: true })}
        />
        <Input
          required
          label="Price"
          placeholder="0.00"
          name="price"
          type="text"
          kind="price"
          register={register('price', { required: true, valueAsNumber: true })}
        />
        <TextArea
          name="description"
          label="Description"
          register={register('description')}
        />
        <Button loading={loading} text="Go stream" />
      </form>
    </Layout>
  );
};

export default Create;
