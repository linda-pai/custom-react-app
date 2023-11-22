import { useCallback, useRef, useState } from "react";

const useLongPress = (
  pressFunc: (event: React.TouchEvent | React.MouseEvent) => void,
  clickFunc: (event: React.TouchEvent | React.MouseEvent) => void
) => {
  const shouldPreventDefault = true,
    delay = 100;

  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const target = useRef();

  const start = useCallback(
    (event: any) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setInterval(() => {
        pressFunc(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [pressFunc, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event: any, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && clickFunc(event); // Pass the event argument to onClick
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        const targetElement = target.current as HTMLElement; // Add type annotation
        targetElement.removeEventListener("touchend", preventDefault);
      }
    },
    [shouldPreventDefault, clickFunc, longPressTriggered]
  );

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onTouchEnd: (e: React.TouchEvent) => clear(e),
  };
};

const isTouchEvent = (event: React.MouseEvent) => {
  return "touches" in event;
};

const preventDefault = (event: any) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
