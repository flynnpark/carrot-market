import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-2 p-5">
      <p className="first-letter:text-5xl first-letter:hover:text-purple-500">
        lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
};

export default Home;
