import { StreamStatus } from 'src/components/CStreamStatus';

const getStatusStyles = (streamStatus: StreamStatus) => {
  switch (streamStatus) {
    case StreamStatus.ONGOING:
      return 'bg-paleMint text-forestGreen';
    case StreamStatus.PENDING:
      return 'bg-paleCyan text-royalBlue';
    default:
      return 'bg-gray-100 text-gray-500';
  }
};
export default getStatusStyles;
