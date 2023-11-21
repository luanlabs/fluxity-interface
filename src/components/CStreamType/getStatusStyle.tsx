import { StreamStatus } from 'src/components/CStreamStatus';

const getStatusStyles = (streamStatus: StreamStatus, isSender: boolean) => {
  switch (streamStatus) {
    case StreamStatus.ONGOING:
      if (isSender) {
        return 'bg-paleCyan text-royalBlue';
      }
      return 'bg-paleMint text-forestGreen';

    case StreamStatus.PENDING:
      if (isSender) {
        return 'bg-lemonChiffon text-bronzeYellow';
      }
      return 'bg-lemonChiffon text-bronzeYellow';

    case StreamStatus.EXPIRED:
      if (isSender) {
        return 'bg-platinum text-grayish';
      }
      return 'bg-platinum text-grayish';
  }
};

export default getStatusStyles;
