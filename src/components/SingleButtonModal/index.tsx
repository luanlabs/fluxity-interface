import CButton, { CButtonVariantType } from '../CButton';

interface SingleButtonModalProps {
  buttonVariant: CButtonVariantType;
  buttonText: string;
  logoColor?: string;
  onClick: () => void;
}

const SingleButtonModal = ({
  buttonVariant,
  buttonText,
  logoColor,
  onClick,
}: SingleButtonModalProps) => {
  return (
    <div className="w-full">
      <CButton
        type="submit"
        variant={buttonVariant}
        content={buttonText}
        svgLogo="fluxityLogo"
        fill={logoColor}
        className="!bg-darkBlue text-white text-center w-full mt-4"
        onClick={onClick}
      />
    </div>
  );
};

export default SingleButtonModal;
