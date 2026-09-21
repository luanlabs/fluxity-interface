import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import DatePicker from 'react-datepicker';
import { createPortal } from 'react-dom';

import useCustomID from 'src/hooks/useCustomId';
import CToggle from 'src/components/CToggle';
import CLabel from 'src/components/CLabel';
import CBottomSheet from 'src/components/CBottomSheet';
import CButton from 'src/components/CButton';

import { Wrapper } from './datePickerStyles';

import 'react-datepicker/dist/react-datepicker.css';

type DatePickerInputProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  containerClassName?: string;
  isDatePickerUsed: boolean;
  isEnabled: boolean;
  onOpenPicker: React.MouseEventHandler<HTMLDivElement>;
};

const DatePickerInput = forwardRef<HTMLButtonElement, DatePickerInputProps>(
  (
    {
      value,
      onClick,
      className,
      id,
      name,
      form,
      title,
      disabled,
      autoFocus,
      tabIndex,
      onBlur,
      onFocus,
      onKeyDown,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledBy,
      containerClassName,
      isDatePickerUsed,
      isEnabled,
      onOpenPicker,
    },
    ref,
  ) => (
    <div className={cn('relative w-full', containerClassName)} onClick={onOpenPicker}>
      <button
        type="button"
        id={id}
        name={name}
        form={form}
        title={title}
        disabled={disabled}
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        aria-describedby={ariaDescribedBy}
        aria-labelledby={ariaLabelledBy}
        className={cn(
          'text-left rounded-xl h-14 px-4 outline-none text-lg placeholder-[#7D7B9B] text-[#7D7B9B] leading-[18.78px] !w-full bg-neutral-100',
          className,
        )}
        onClick={onClick}
        ref={ref}
      >
        <span className={isDatePickerUsed ? 'text-sm text-midnightBlue' : ''}>
          <span className={!isEnabled ? 'text-[#a2a1b7]' : ''}>
            {isDatePickerUsed ? String(value) : 'Choose date'}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`
            absolute
            right-4
            bottom-[10px]
            w-[25px]
            h-[30px]
            ${isEnabled ? 'bg-calendar' : 'bg-disableCalendar'}
            bg-no-repeat
            bg-right
          `}
        />
      </button>
    </div>
  ),
);

DatePickerInput.displayName = 'DatePickerInput';

interface CDatePickerProps {
  label?: string;
  onChange: (value: Date) => void;
  className?: string;
  minDate: Date;
  maxDate: Date;
  readonly?: boolean;
  tooltipTitle: string;
  tooltipDetails?: string;
  isFormReset?: boolean;
  setIsFormReset?: (_: boolean) => void;
  value: Date;
  isSticky?: boolean;
}

const CDatePicker = ({
  label,
  onChange,
  className,
  minDate,
  maxDate,
  readonly,
  tooltipDetails,
  tooltipTitle,
  value,
  isFormReset,
  setIsFormReset,
  isSticky,
}: CDatePickerProps) => {
  const id = useCustomID('CDatePicker');
  const [selectedDate, setSelectedDate] = useState(minDate || new Date());
  const [isDatePickerUsed, setIsDatePickerUsed] = useState(false);
  const [enabledDatePicker, setEnabledDatePicker] = useState(false);
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [isOpenDesktop, setIsOpenDesktop] = useState(false);
  const [desktopPosition, setDesktopPosition] = useState({ top: 0, left: 0 });
  const desktopAnchorRef = useRef<HTMLDivElement | null>(null);
  const desktopCalendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!value) {
      setIsDatePickerUsed(false);
      setIsToggleEnabled(false);
      setEnabledDatePicker(false);
    } else {
      setSelectedDate(value);
      setIsDatePickerUsed(true);
      setIsToggleEnabled(true);
      setEnabledDatePicker(true);
    }

    if (isFormReset && setIsFormReset) {
      setIsFormReset(false);
    }
  }, [value, isFormReset, setIsFormReset]);

  const handleToggleStatus = (value: boolean) => {
    setEnabledDatePicker(value);

    if (!value) {
      setIsOpenDesktop(false);
      setIsOpenSheet(false);
    }
  };

  const handleChange = (value: Date) => {
    setSelectedDate(value);
    onChange(value);

    if (!isDatePickerUsed) {
      setIsDatePickerUsed(true);
    }
  };

  const filterPassedTime = (time: Date) => {
    if (!maxDate) {
      return minDate.getTime() < time.getTime();
    }
    return minDate.getTime() < time.getTime() && maxDate.getTime() > time.getTime();
  };

  const updateDesktopPosition = useCallback(() => {
    const anchor = desktopAnchorRef.current;

    if (!anchor) {
      return;
    }

    const anchorRect = anchor.getBoundingClientRect();
    const calendarRect = desktopCalendarRef.current?.getBoundingClientRect();
    const calendarWidth = calendarRect?.width ?? 520;
    const calendarHeight = calendarRect?.height ?? 390;
    const viewportPadding = 16;
    const gap = 8;
    const spaceBelow = window.innerHeight - anchorRect.bottom - viewportPadding;
    const spaceAbove = anchorRect.top - viewportPadding;
    const shouldOpenAbove = spaceBelow < calendarHeight && spaceAbove > spaceBelow;
    const top = shouldOpenAbove
      ? Math.max(viewportPadding, anchorRect.top - calendarHeight - gap)
      : Math.min(
          anchorRect.bottom + gap,
          Math.max(viewportPadding, window.innerHeight - calendarHeight - viewportPadding),
        );
    const left = Math.min(
      Math.max(viewportPadding, anchorRect.left),
      Math.max(viewportPadding, window.innerWidth - calendarWidth - viewportPadding),
    );

    setDesktopPosition((currentPosition) => {
      if (currentPosition.top === top && currentPosition.left === left) {
        return currentPosition;
      }

      return { top, left };
    });
  }, []);

  const handleOpenPicker: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!enabledDatePicker && !readonly) {
      return;
    }

    if (window.matchMedia('(max-width: 1023px)').matches) {
      setIsOpenDesktop(false);
      setIsOpenSheet(true);

      return;
    }

    const anchor = event.currentTarget;

    if (isOpenDesktop && desktopAnchorRef.current === anchor) {
      setIsOpenDesktop(false);
      return;
    }

    desktopAnchorRef.current = anchor;
    const anchorRect = anchor.getBoundingClientRect();
    setDesktopPosition({ top: anchorRect.bottom + 8, left: anchorRect.left });
    setIsOpenDesktop(true);
  };

  useLayoutEffect(() => {
    if (isOpenDesktop) {
      updateDesktopPosition();
    }
  }, [isOpenDesktop, updateDesktopPosition]);

  useEffect(() => {
    if (!isOpenDesktop) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        desktopCalendarRef.current?.contains(target) ||
        desktopAnchorRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpenDesktop(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpenDesktop(false);
        desktopAnchorRef.current?.querySelector('button')?.focus();
      }
    };
    const handleViewportChange = () => {
      if (window.matchMedia('(max-width: 1023px)').matches) {
        setIsOpenDesktop(false);
        return;
      }

      updateDesktopPosition();
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('scroll', handleViewportChange, true);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleViewportChange);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('scroll', handleViewportChange, true);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, [isOpenDesktop, updateDesktopPosition]);

  const handleCloseSheetClick = () => {
    setIsDatePickerUsed(false);
    setIsOpenSheet(false);
  };

  const handleConfirmSheetClick = () => {
    setIsOpenSheet(false);
  };

  const customInput = (
    <DatePickerInput
      containerClassName={className}
      isDatePickerUsed={isDatePickerUsed}
      isEnabled={Boolean(enabledDatePicker || readonly)}
      onOpenPicker={handleOpenPicker}
    />
  );

  return (
    <div>
      <div className="flex items-center w-full">
        <CLabel
          label={label}
          tooltipDetails={tooltipDetails}
          tooltipTitle={tooltipTitle}
          htmlFor={id}
          className={`mr-[10px] ${enabledDatePicker || readonly ? '' : '!text-[#817fa0]'}`}
          disabled={!enabledDatePicker && !readonly ? true : false}
        />
        <div className="mb-1.5">
          <CToggle
            onChange={handleToggleStatus}
            readonly={readonly}
            isToggleEnabled={isToggleEnabled}
          />
        </div>
      </div>

      <div className="w-full">
        <Wrapper>
          <DatePicker
            id={id}
            open={false}
            selected={selectedDate}
            onChange={handleChange}
            customInput={customInput}
            minDate={minDate}
            maxDate={maxDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            filterTime={filterPassedTime}
            timeCaption="Time"
            dateFormat="MMM dd, yyyy HH:mm"
            disabled={!enabledDatePicker && !readonly}
          />
        </Wrapper>

        {isOpenDesktop &&
          typeof document !== 'undefined' &&
          createPortal(
            <div
              ref={desktopCalendarRef}
              role="dialog"
              aria-label={`${label || 'Date'} picker`}
              className="fixed z-[1000] mobile:hidden"
              style={{ top: desktopPosition.top, left: desktopPosition.left }}
            >
              <Wrapper>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleChange}
                  minDate={minDate}
                  maxDate={maxDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  filterTime={filterPassedTime}
                  timeCaption="Time"
                  dateFormat="MMM dd, yyyy HH:mm"
                  disabled={!enabledDatePicker && !readonly}
                  inline
                />
              </Wrapper>
            </div>,
            document.body,
          )}

        <CBottomSheet
          contentClass="justify-center items-center w-full"
          isSticky={isSticky}
          isModalOpen={isOpenSheet}
          setIsModalOpen={setIsOpenSheet}
          className="desktop:!hidden"
        >
          <Wrapper>
            <DatePicker
              selected={selectedDate}
              onChange={handleChange}
              minDate={minDate}
              maxDate={maxDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              filterTime={filterPassedTime}
              timeCaption="Time"
              dateFormat="MMM dd, yyyy HH:mm"
              disabled={!enabledDatePicker && !readonly}
              inline
            />
          </Wrapper>
          <div className=" w-full flex justify-end px-4 py-5 gap-2">
            <CButton
              variant="simple"
              color="blueWhite"
              content="Close"
              className="rounded-xl !py-5 !h-[60px] text-slate-700"
              onClick={handleCloseSheetClick}
            />
            <CButton
              variant="simple"
              color="blue"
              content="Confirm"
              className="rounded-xl !py-5 !h-[60px]"
              onClick={handleConfirmSheetClick}
            />
          </div>
        </CBottomSheet>
      </div>
    </div>
  );
};
export default CDatePicker;
