import React from 'react';

import { NavLink as Type } from './types';

import HomeIcon from 'src/svgs/Home';
import ActivityIcon from 'src/svgs/Activity';
import CopyIcon from 'src/svgs/Copy';
import NotebookIcon from 'src/svgs/Notebook';
import StairsIcon from 'src/svgs/Stairs';
import StreamLinesIcon from 'src/svgs/StreamLines';
import { Pages } from './pages';

export const navLinks: Type[] = [
  {
    title: 'Home',
    icon: <HomeIcon fill="#EBFDFF" />,
    activeIcon: <HomeIcon />,
    url: Pages.HOME,
  },
  {
    title: 'Create Stream',
    icon: <StreamLinesIcon />,
    activeIcon: <StreamLinesIcon />,
    url: Pages.CREATE_STREAM,
  },
  {
    title: 'Activity History',
    icon: <ActivityIcon fill="#EBFDFF" />,
    activeIcon: <ActivityIcon />,
    url: Pages.ACTIVITY_HISTORY,
  },
  {
    title: 'NFTs',
    icon: <CopyIcon fill="#EBFDFF" />,
    activeIcon: <CopyIcon />,
    url: Pages.NFTS,
  },
  {
    title: 'Vesting',
    icon: <StairsIcon fill="#EBFDFF" />,
    activeIcon: <StairsIcon />,
    url: Pages.VESTING,
  },
  {
    title: 'Address Book',
    icon: <NotebookIcon fill="#EBFDFF" />,
    activeIcon: <NotebookIcon />,
    url: Pages.ADDRESS_BOOK,
  },
];
