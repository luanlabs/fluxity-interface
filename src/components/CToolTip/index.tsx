import styled from 'styled-components';
import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';

interface ToolTipProps {
  title: string;
  text: string;
  children: JSX.Element | React.ReactNode;
  visible: boolean;
  setVisible: (_: boolean) => void;
  placement: 'top' | 'bottom';
}

const CToolTip = ({ text, title, placement, children, visible, setVisible }: ToolTipProps) => {
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const ArrowStyle = styled.div`
    .tippy-svg-arrow {
      transform: ${placement === 'bottom' ? 'none' : 'rotateX(180deg)'} !important;
      width: 100%;
      display: flex;
      justify-content: ${placement === 'bottom' ? 'end' : 'center'};
      fill: #050142;
      margin-top: -1px;
      margin-left: ${placement === 'bottom' ? '-8px' : '3px'} !important;
      top: ${placement === 'bottom' ? '-5px' : 'none'};
    }

    .tippy-box {
      line-height: 0.9em;
    }
  `;

  const toolTipContent = (
    <div className="text-white text-left bg-midnightBlue w-[240px] px-4 py-3 rounded-xl">
      {title && (
        <div>
          <h3 className="text-base mb-1">{title}</h3>
          <div className="w-[20px] h-[2px] bg-royalBlue mb-2"></div>
        </div>
      )}

      <span className="text-[13px] tracking-wide ">{text}</span>
    </div>
  );

  return (
    <>
      <ArrowStyle>
        <Tippy
          content={toolTipContent}
          placement={placement}
          interactive
          visible={visible}
          onClickOutside={hide}
          arrow={roundArrow}
        >
          <div onMouseEnter={show} onMouseLeave={hide}>
            {children}
          </div>
        </Tippy>
      </ArrowStyle>
    </>
  );
};

export default CToolTip;
