import React from 'react';

import { CNavLinkProps as Type } from './types';

import HomeIcon from 'src/assets/Home';
import ActivityIcon from 'src/assets/Activity';
import StreamLinesIcon from 'src/assets/StreamLines';

import StairsIcon from 'src/assets/Stairs';

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
    title: 'Vesting',
    icon: <StairsIcon fill="#EBFDFF" />,
    activeIcon: <StairsIcon />,
    url: Pages.VESTING,
  },
];
