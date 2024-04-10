import React from 'react';

import SendIcon from 'src/assets/SendIcon';
import ReceiveIcon from 'src/assets/ReceiveIcon';
import { StreamStatus } from '../CStreamStatus';
import getStatusStyles from './getStatusStyle';

import Pause from 'src/assets/Pause';

type CStreamTypeProps = {
  isSender: boolean;
  streamStatus: StreamStatus;
  isVesting: boolean;
};

const CStreamType = ({ isSender, streamStatus, isVesting }: CStreamTypeProps) => {
  return (
    <div
      className={`inline-flex justify-center whitespace-nowrap items-center gap-2 p-[10px] select-none rounded-xl mobile:!bg-transparent ${getStatusStyles(
        streamStatus,
        isSender,
      )}
      `}
    >
      <span>
        {streamStatus === 'pending' ? (
          <Pause />
        ) : isSender ? (
          <SendIcon
            fill={
              streamStatus === 'completed' || streamStatus === 'cancelled' ? '#6A6C74' : '#3A21D5'
            }
          />
        ) : (
          <ReceiveIcon
            fill={
              streamStatus === 'completed' || streamStatus === 'cancelled' ? '#6A6C74' : '#1C9B47'
            }
          />
        )}
      </span>
      <span className="gap-2 mobile:whitespace-nowrap">
        {isSender ? 'Send' : 'Receive'} {isVesting ? 'Vesting' : 'Stream'}
      </span>
    </div>
  );
};

export default CStreamType;
