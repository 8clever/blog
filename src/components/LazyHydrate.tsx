
import React from "react";
import Lazy, { LazyProps } from "react-lazy-hydration";

const hydrate = (deadline: IdleDeadline, cb: (value?: null) => void) => {
  if (deadline.timeRemaining() > 40) {
    cb();
    return;
  }

  requestIdleCallback(deadline => {
    hydrate(deadline, cb);
  });
}

export const LazyHydrate = (props: LazyProps) => {
  return (
    <Lazy 
      {...props} 
      noWrapper
      promise={new Promise(cb => {
        if (typeof requestIdleCallback === "undefined") {
          setTimeout(cb, 4000);
          return;
        }
        
        requestIdleCallback(deadline => {
          hydrate(deadline, cb)
        });
      })}
    />
  )
}