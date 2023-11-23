import React, { useEffect, useState } from 'react';
import { ProgressStyle } from './style';

interface ProgressProps {
  progressValue: number;
}

const App = ({ progressValue }: ProgressProps) => {
  return (
    <ProgressStyle>
      <div className="bar">
        <div className="progress" style={{ width: `${progressValue}%` }}></div>
      </div>
    </ProgressStyle>
  );
};

export default App;
