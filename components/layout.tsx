import Link from 'next/link';
import { useRouter } from 'next/router';
import { classnames } from '../libs/utils';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
}

export default function Layout({
  children,
  title,
  canGoBack,
  hasTabBar,
}: LayoutProps) {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <div>
      <div className="bg-white w-full h-12 max-w-xl justify-center text-lg px-10 font-medium fixed text-gray-800 border-b top-0 flex items-center">
        {canGoBack ? (
          <button onClick={handleClick} className="absolute left-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : null}
        {title ? (
          <span className={classnames(canGoBack ? 'mx-auto' : '')}>
            {title}
          </span>
        ) : null}
      </div>
      <div className={classnames('pt-12', hasTabBar ? 'pb-[6.5rem]' : '')}>
        {children}
      </div>
      {hasTabBar ? (
        <nav className="bg-white w-full max-w-xl text-gray-700 border-t fixed bottom-0 px-2 pb-5 pt-3 flex justify-between items-center text-sm">
          <Link href="/">
            <a
              className={classnames(
                'flex flex-col items-center space-y-2 w-full',
                router.pathname === '/'
                  ? 'text-orange-500'
                  : 'hover:text-gray-500 transition-colors'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>홈</span>
            </a>
          </Link>
          <Link href="/community">
            <a
              className={classnames(
                'flex flex-col items-center space-y-2 w-full',
                router.pathname === '/community'
                  ? 'text-orange-500'
                  : 'hover:text-gray-500 transition-colors'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <span>동네생활</span>
            </a>
          </Link>
          <Link href="/chats">
            <a
              className={classnames(
                'flex flex-col items-center space-y-2 w-full',
                router.pathname === '/chats'
                  ? 'text-orange-500'
                  : 'hover:text-gray-500 transition-colors'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>메세지</span>
            </a>
          </Link>
          <Link href="/live">
            <a
              className={classnames(
                'flex flex-col items-center space-y-2 w-full',
                router.pathname === '/live'
                  ? 'text-orange-500'
                  : 'hover:text-gray-500 transition-colors'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>라이브</span>
            </a>
          </Link>
          <Link href="/profile">
            <a
              className={classnames(
                'flex flex-col items-center space-y-2 w-full',
                router.pathname === '/profile'
                  ? 'text-orange-500'
                  : 'hover:text-gray-500 transition-colors'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>프로필</span>
            </a>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
