import Image from 'next/image';
import toast from 'react-hot-toast';

import exitLight from '/public/images/exitLight.svg';
import successLogo from '/public/images/success.svg';
import errorLogo from '/public/images/error.svg';

const toastStyle = {
  style: {
    padding: '16px',
    color: '#fff',
    backgroundColor: '#050142',
    width: 'auto',
    minWidth: '550px',
  },
};

export const toastError = (t, error: boolean, alertMsg: string) => {
  toast(
    <div className="flex items-center justify-between w-full">
      <div className="items-center">
        <Image src={error ? errorLogo : successLogo} width={35} height={35} alt="error" />
      </div>
      <span className="w-full text-lg ml-3">{alertMsg}</span>
      <button onClick={() => toast.dismiss(t.id)} className="">
        <Image src={exitLight} width={0} height={0} alt="error" />
      </button>
    </div>,
    toastStyle,
  );
};
