import React from 'react';
import { SvgProps } from '../models';

const Icon = ({ fill = 'currentColor' }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
  >
    <path d="M4.5 7H16.5" stroke={fill} stroke-width="1.5" stroke-linecap="round" />
    <path d="M7.5 12H21.5" stroke={fill} stroke-width="1.5" stroke-linecap="round" />
    <path d="M4.5 17H16.5" stroke={fill} stroke-width="1.5" stroke-linecap="round" />
  </svg>
);

export default Icon;
