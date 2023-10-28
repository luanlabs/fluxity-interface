import React from 'react';

import SendIcon from 'src/assets/SendIcon';
import ReceiveIcon from 'src/assets/ReceiveIcon';
import { StreamStatus } from '../CStreamStatus';
import getStatusStyles from './getStatusStyle';

import Pause from 'src/assets/Pause';

type CStreamTypeProps = {
  type: 'receive' | 'send';
  streamStatus: StreamStatus;
};

const CStreamType = ({ type, streamStatus }: CStreamTypeProps) => {
  return (
    <div
      className={`inline-flex justify-center items-center gap-2 p-[10px] select-none rounded-xl ${getStatusStyles(
        streamStatus,
        type
      )}
      `}
    >
      <span>
        {streamStatus === 'pending' ? (
          <Pause />
        ) : type === 'send' ? (
          <SendIcon fill={streamStatus === 'expired' ? '#6A6C74' : '#3A21D5'} />
        ) : (
          <ReceiveIcon
            fill={streamStatus === 'expired' ? '#6A6C74' : '#1C9B47'}
          />
        )}
      </span>
      <span className="gap-2">
        {type === 'receive' ? 'Receive' : 'Send'} Stream
      </span>
    </div>
  );
};

export default CStreamType;
