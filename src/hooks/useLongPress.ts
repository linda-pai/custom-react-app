import { useCallback, useRef, useState } from "react";

const useLongPress = (
  pressFunc: (event: any) => void,
  clickFunc: (event: any) => void
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
    onMouseDown: (e: any) => start(e),
    onTouchStart: (e: any) => start(e),
    onMouseUp: (e: any) => clear(e),
    onMouseLeave: (e: any) => clear(e, false),
    onTouchEnd: (e: any) => clear(e),
  };
};

const isTouchEvent = (event: any) => {
  return "touches" in event;
};

const preventDefault = (event: any) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
