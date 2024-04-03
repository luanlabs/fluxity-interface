import Receiver from 'src/assets/Receiver';
import Sender from 'src/assets/Sender';

interface StreamIconProps {
  sender: boolean;
  receiver: boolean;
  streamStatus: string;
}

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

  completed: {
    fill: '#E1E1E9',
    arrowFill: '#6A6C74',
    lineFill: '#6A6C74',
  },
};

const StreamIcon = ({ sender, receiver, streamStatus }: StreamIconProps) => {
  let senderStyle = {
    bg: '#EBFDFF',
    fill: '#3A21D4',
  };

  let receiverStyle = {
    bg: statusColors.ongoing.fill,
    fill: statusColors.ongoing.lineFill,
  };

  if (streamStatus === 'completed') {
    receiverStyle = {
      bg: statusColors.completed.fill,
      fill: statusColors.completed.lineFill,
    };
  } else if (streamStatus === 'pending') {
    receiverStyle = {
      bg: statusColors.pending.fill,
      fill: statusColors.pending.lineFill,
    };
  }

  if (streamStatus === 'completed') {
    senderStyle = {
      bg: statusColors.completed.fill,
      fill: statusColors.completed.lineFill,
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
