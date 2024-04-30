import toast from 'src/components/CToast';
import CInput from 'src/components/CInput';
import CModal from 'src/components/CModal';
import CShare from 'src/components/CShare';
import shareLinks from 'src/constants/shareLinks';
import copyText from 'src/utils/copyText';

interface ShareModalProps {
  isOpenModal: boolean;
  setIsOpenModal: (_: boolean) => void;
  id: string;
}

const ShareModal = ({ isOpenModal, setIsOpenModal, id }: ShareModalProps) => {
  const shareOptions = shareLinks(id);
  const inputValue = `https://app.fluxity.finance/lockup/${id}`;

  const handleCopy = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    copyText(inputValue);
    toast('success', 'Link copied successfully');
  };

  return (
    <CModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} title="Share" hasCloseButton>
      <div className="py-6">
        <div className="flex sm:flex-wrap justify-center items-center gap-3 w-[400px] sm:w-full m-auto">
          {shareOptions.map((option, index) => (
            <CShare
              key={index}
              name={option.name}
              href={option.href}
              image={option.image}
              alt={option.alt}
            />
          ))}
        </div>

        <div className="flex flex-col justify-center items-center">
          <CInput
            value={inputValue}
            copyButton
            handleCopyButton={handleCopy}
            className="w-[400px] sm:w-full"
          />
        </div>
      </div>
    </CModal>
  );
};

export default ShareModal;
