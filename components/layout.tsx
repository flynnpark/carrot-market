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
  return (
    <div>
      <div className="bg-white w-full max-w-lg text-lg font-medium py-3 fixed text-gray-700 border-b top-0 flex items-center justify-center">
        {title ? <span>{title}</span> : null}
      </div>
      <div className={classnames('pt-16', hasTabBar ? 'pb-16' : '')}>
        {children}
      </div>
      {hasTabBar ? (
        <nav className="bg-white w-full max-w-lg text-gray-800 border-t fixed bottom-0 pb-10 pt-3 flex justify-between items-center">
          span*5
        </nav>
      ) : null}
    </div>
  );
}
