import { NextPage } from 'next';
import { Fragment } from 'react';

const StreamDetail: NextPage = () => {
  return (
    <div className="py-10 px-4 space-y-4">
      <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
      <div className="mt-5">
        <h1 className="text-gray-800 font-bold text-3xl mt-2">
          Let&apos;s try potatoes
        </h1>
        <p className="my-3 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Live Chats</h2>
        <div className="py-10 pb-16 h-[50vh] overflow-y-scroll space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (
            <Fragment key={i}>
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-300" />
                <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                  <p>Hi how much are you selling them for?</p>
                </div>
              </div>
              <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
                <div className="w-8 h-8 rounded-full bg-slate-300" />
                <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                  <p>I want ￦20,000</p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="fixed py-2 bg-white bottom-0 inset-x-0">
          <div className="flex relative max-w-md items-center w-full mx-auto">
            <input
              type="text"
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamDetail;
