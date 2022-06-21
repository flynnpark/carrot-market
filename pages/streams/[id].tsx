import type { NextPage } from 'next';
import Layout from 'components/layout';
import Message from 'components/message';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/router';
import { Message as MessageModel, Stream } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from 'libs/client/useMutation';
import useUser from 'libs/client/useUser';
import { useEffect } from 'react';

interface StreamWithMessages extends Stream {
  messages: {
    id: number;
    message: string;
    user: {
      id: number;
      name: string;
      avatar: string | null;
    };
  }[];
}

interface StreamResponse {
  success: boolean;
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

interface SendMessageResponse {
  success: boolean;
  message: MessageModel;
}

const StreamDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<StreamResponse>(
    `/api/streams/${router.query.id}`
  );
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const [sendMessage, { loading, data: sendMessageData }] =
    useMutation<SendMessageResponse>(
      `/api/streams/${router.query.id}/messages`
    );

  const onValid = (form: MessageForm) => {
    if (loading) return;
    sendMessage(form);
    reset();
  };

  useEffect(() => {
    if (sendMessageData?.success) {
      mutate();
    }
  }, [mutate, sendMessageData]);

  return (
    <Layout canGoBack>
      <div className="py-10 px-4  space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream.name}
          </h1>
          <span className="text-2xl block mt-3 text-gray-900">
            ${data?.stream.price}
          </span>
          <p className=" my-6 text-gray-700">{data?.stream.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4">
            {data?.stream.messages.map(({ id, message, user: sendUser }) => (
              <Message
                key={id}
                message={message}
                reversed={sendUser.id === user?.id}
              />
            ))}
          </div>
          <div className="fixed py-2 bg-white  bottom-0 inset-x-0">
            <form
              className="flex relative max-w-md items-center  w-full mx-auto"
              onSubmit={handleSubmit(onValid)}
            >
              <input
                type="text"
                className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
                {...register('message', { required: true })}
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
