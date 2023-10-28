import { StreamStatus } from 'src/components/CStreamStatus';

const getStatusStyles = (streamStatus: StreamStatus) => {
  switch (streamStatus) {
    case StreamStatus.ONGOING:
      return 'bg-paleMint text-forestGreen';
    case StreamStatus.PENDING:
      return 'bg-lemonChiffon text-bronzeYellow';
    default:
      return 'bg-platinum text-grayish';
  }
};
export default getStatusStyles;
