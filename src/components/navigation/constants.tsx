import { IUser } from '@api/auth/types';

export interface ICollectionSidebarItem {
  id: string;
  label: string;
  route: string;
}

export const getSidebarItems = (user?: IUser) => {
  if (!user) {
    return [
      {
        id: 'login',
        label: 'Login',
        route: '/login',
      },
    ] as ICollectionSidebarItem[];
  }

  const allItems = [
    {
      id: 'home',
      label: 'Home',
      route: '/',
    },
    {
      id: 'my-collections',
      label: 'My collections',
      route: '/my-collections',
    },
  ] as ICollectionSidebarItem[];

  return allItems;
};
