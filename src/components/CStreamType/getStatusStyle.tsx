import { StreamStatus } from 'src/components/CStreamStatus';

const getStatusStyles = (
  streamStatus: StreamStatus,
  type: 'receive' | 'send'
) => {
  switch (streamStatus) {
    case StreamStatus.ONGOING:
      switch (type) {
        case 'receive':
          return 'bg-paleMint text-forestGreen';
        case 'send':
          return 'bg-paleCyan text-royalBlue';
      }
    case StreamStatus.PENDING:
      switch (type) {
        case 'receive':
          return 'bg-lemonChiffon text-bronzeYellow';
        case 'send':
          return 'bg-lemonChiffon text-bronzeYellow';
      }
    case StreamStatus.EXPIRED:
      switch (type) {
        case 'receive':
          return 'bg-platinum text-grayish';
        case 'send':
          return 'bg-platinum text-grayish';
      }
  }
};

export default getStatusStyles;
