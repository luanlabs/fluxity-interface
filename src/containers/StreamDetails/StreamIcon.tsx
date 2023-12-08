import Receiver from 'src/assets/Receiver';
import Sender from 'src/assets/Sender';

interface StreamIconProps {
  sender: boolean;
  receiver: boolean;
  streamStatus: string;
}

const StreamIcon = ({ sender, receiver, streamStatus }: StreamIconProps) => {
  const statusColors = {
    pending: {
      fill: '#FFF59A',
      arrowFill: '#947000',
      lineFill: '#947000',
    },

    ongoing: {
      fill: '#E4FFED',
      arrowFill: '#1C9B47',
      lineFill: '#1C9B47',
    },

    expired: {
      fill: '#E1E1E9',
      arrowFill: '#6A6C74',
      lineFill: '#6A6C74',
    },
  };

  let senderStyle = {
    bg: '#EBFDFF',
    fill: '#3A21D4',
  };

  let receiverStyle = {
    bg: statusColors.ongoing.fill,
    fill: statusColors.ongoing.lineFill,
  };

  if (streamStatus === 'expired') {
    receiverStyle = {
      bg: statusColors.expired.fill,
      fill: statusColors.expired.lineFill,
    };
  } else if (streamStatus === 'pending') {
    receiverStyle = {
      bg: statusColors.pending.fill,
      fill: statusColors.pending.lineFill,
    };
  }

  if (streamStatus === 'expired') {
    senderStyle = {
      bg: statusColors.expired.fill,
      fill: statusColors.expired.lineFill,
    };
  } else if (streamStatus === 'pending') {
    senderStyle = {
      bg: statusColors.pending.fill,
      fill: statusColors.pending.lineFill,
    };
  }

  return (
    <div>
      <div>
        {receiver && (
          <Receiver
            fill={receiverStyle.bg}
            arrowFill={receiverStyle.fill}
            lineFill={receiverStyle.fill}
          />
        )}
      </div>
      <div>
        {sender && (
          <Sender fill={senderStyle.bg} arrowFill={senderStyle.fill} lineFill={senderStyle.fill} />
        )}
      </div>
    </div>
  );
};

export default StreamIcon;
