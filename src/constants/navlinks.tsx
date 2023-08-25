import React from 'react';

import { NavLink as Type } from './types';

import HomeIcon from 'src/svgs/Home';
import ActivityIcon from 'src/svgs/Activity';
import CopyIcon from 'src/svgs/Copy';
import NotebookIcon from 'src/svgs/Notebook';
import StairsIcon from 'src/svgs/Stairs';
import StreamLinesIcon from 'src/svgs/StreamLines';

export const navLinks: Type[] = [
  {
    title: 'Home',
    icon: <HomeIcon fill="#EBFDFF" />,
    activeIcon: <HomeIcon />,
    url: '/',
  },
  {
    title: 'Create Stream',
    icon: <StreamLinesIcon />,
    activeIcon: <StreamLinesIcon />,
    url: '/create',
  },
  {
    title: 'Activity History',
    icon: <ActivityIcon fill="#EBFDFF" />,
    activeIcon: <ActivityIcon />,
    url: '/activity',
  },
  {
    title: 'NFTs',
    icon: <CopyIcon fill="#EBFDFF" />,
    activeIcon: <CopyIcon />,
    url: '/nfts',
  },
  {
    title: 'Vesting',
    icon: <StairsIcon fill="#EBFDFF" />,
    activeIcon: <StairsIcon />,
    url: '/vesting',
  },
  {
    title: 'Address Book',
    icon: <NotebookIcon fill="#EBFDFF" />,
    activeIcon: <NotebookIcon />,
    url: '/address-book',
  },
];
