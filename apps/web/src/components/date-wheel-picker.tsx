'use client';

import { useCallback, useEffect, useRef } from 'react';
import { MONTH_NAMES } from '@/lib/booking-date';

const ITEM_HEIGHT = 44;
const WHEEL_DELTA_THRESHOLD = 35;
const WHEEL_STEP_LOCK_MS = 120;

type WheelPickerProps<T extends string | number> = {
  id: string;
  label: string;
  items: readonly T[];
  value: T;
  formatItem: (item: T) => string;
  onChange: (value: T) => void;
  onInteract?: () => void;
};

function WheelPicker<T extends string | number>({
  id,
  label,
  items,
  value,
  formatItem,
  onChange,
  onInteract,
}: WheelPickerProps<T>) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelAccumulatorRef = useRef(0);
  const wheelLockRef = useRef(false);
  const selectedIndex = items.indexOf(value);

  const snapToIndex = useCallback(
    (index: number, notify = true) => {
      const viewport = viewportRef.current;
      if (!viewport || items.length === 0) {
        return;
      }

      const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
      viewport.scrollTop = clampedIndex * ITEM_HEIGHT;

      const nextValue = items[clampedIndex];
      if (notify && nextValue !== undefined && nextValue !== value) {
        onChange(nextValue);
        onInteract?.();
      }
    },
    [items, onChange, onInteract, value],
  );

  useEffect(() => {
    if (selectedIndex >= 0) {
      snapToIndex(selectedIndex, false);
    }
  }, [selectedIndex, snapToIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');

    function handleWheel(event: WheelEvent) {
      if (coarsePointerQuery.matches) {
        return;
      }

      event.preventDefault();

      if (wheelLockRef.current) {
        return;
      }

      wheelAccumulatorRef.current += event.deltaY;

      if (Math.abs(wheelAccumulatorRef.current) < WHEEL_DELTA_THRESHOLD) {
        return;
      }

      const direction = wheelAccumulatorRef.current > 0 ? 1 : -1;
      wheelAccumulatorRef.current = 0;
      wheelLockRef.current = true;

      const wheelViewport = viewportRef.current;
      if (!wheelViewport) {
        return;
      }

      const currentIndex = Math.round(wheelViewport.scrollTop / ITEM_HEIGHT);
      snapToIndex(currentIndex + direction);

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, WHEEL_STEP_LOCK_MS);
    }

    viewport.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      viewport.removeEventListener('wheel', handleWheel);
    };
  }, [snapToIndex]);

  function handleScroll() {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      const index = Math.round(viewport.scrollTop / ITEM_HEIGHT);
      snapToIndex(index);
    }, 80);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (selectedIndex < 0) {
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      snapToIndex(selectedIndex - 1);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      snapToIndex(selectedIndex + 1);
    }
  }

  function handleOptionClick(index: number) {
    snapToIndex(index);
  }

  return (
    <div className="date-wheel">
      <span className="date-wheel__label" id={`${id}-label`}>
        {label}
      </span>
      <div className="date-wheel__frame">
        <div
          ref={viewportRef}
          id={id}
          className="date-wheel__viewport"
          role="listbox"
          aria-labelledby={`${id}-label`}
          aria-activedescendant={`${id}-option-${selectedIndex}`}
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
        >
          <div className="date-wheel__spacer" aria-hidden />
          {items.map((item, index) => {
            const isSelected = item === value;
            return (
              <div
                key={String(item)}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`date-wheel__item${isSelected ? ' date-wheel__item--selected' : ''}`}
                onClick={() => handleOptionClick(index)}
              >
                {formatItem(item)}
              </div>
            );
          })}
          <div className="date-wheel__spacer" aria-hidden />
        </div>
        <div className="date-wheel__highlight" aria-hidden />
      </div>
    </div>
  );
}

type DateWheelPickerProps = {
  day: number;
  monthIndex: number;
  dayOptions: readonly number[];
  monthOptions: readonly number[];
  onDayChange: (day: number) => void;
  onMonthChange: (monthIndex: number) => void;
  onInteract?: () => void;
};

export function DateWheelPicker({
  day,
  monthIndex,
  dayOptions,
  monthOptions,
  onDayChange,
  onMonthChange,
  onInteract,
}: DateWheelPickerProps) {
  return (
    <fieldset className="date-wheels">
      <legend>Preferred date</legend>
      <WheelPicker
        id="booking-day"
        label="Day"
        items={dayOptions}
        value={day}
        formatItem={(item) => String(item)}
        onChange={onDayChange}
        onInteract={onInteract}
      />
      <WheelPicker
        id="booking-month"
        label="Month"
        items={monthOptions}
        value={monthIndex}
        formatItem={(item) => MONTH_NAMES[item] ?? ''}
        onChange={onMonthChange}
        onInteract={onInteract}
      />
    </fieldset>
  );
}
