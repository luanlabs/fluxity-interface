export type Link = {
  title: string;
  url: string;
};

export type NavLink = {
  title: string;
  icon: JSX.Element | React.ReactNode;
  url: string;
  isMinimized: boolean;
};
