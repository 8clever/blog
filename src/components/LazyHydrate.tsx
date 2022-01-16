
import React from "react";
import Lazy, { LazyProps } from "react-lazy-hydration";

/** polyfill */
if (
  typeof window !== "undefined" &&
  typeof requestIdleCallback === "undefined") {
  /** @ts-ignore */
  window.requestIdleCallback = function (cb) {
    var start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  }
}

export const lazy = (cb: (value?: null) => void, deadline?: IdleDeadline) => {
  if (typeof requestIdleCallback === "undefined") {
    setTimeout(cb, 4000);
    return;
  }

  if (deadline && deadline.timeRemaining() > 40) {
    cb();
    return;
  }

  requestIdleCallback(deadline => {
    lazy(cb, deadline);
  });
}

export const LazyHydrate = (props: LazyProps) => {
  return (
    <Lazy 
      {...props} 
      noWrapper
      promise={new Promise(res => lazy(res))}
    />
  )
}