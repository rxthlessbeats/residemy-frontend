import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import CircleStackIcon from '@heroicons/react/24/solid/CircleStackIcon';
import ArticleIcon from '@mui/icons-material/Article';

export const getNavItems = (userId) => [
  {
    title: '韌學堂總覽',
    path: `/${userId}/`,
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: '文件庫',
    path: `/${userId}/documents`,
    icon: (
      <SvgIcon fontSize="small">
        <CircleStackIcon />
      </SvgIcon>
    )
  },
  {
    title: '研討會文件',
    path: `/${userId}/forums`,
    icon: (
      <SvgIcon fontSize="small">
        <ArticleIcon />
      </SvgIcon>
    )
  },
  {
    title: '帳號設定',
    path: `/${userId}/account`,
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Settings',
  //   path: `/${userId}/settings`,
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];
