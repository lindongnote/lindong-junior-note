export function attemptWithDelay(maxTryIterate, delayMs, attempt) {
  return new Promise((resolve, reject) => {
    let tryIterate = 0;
    function attemptWithDelayInner() {
      tryIterate++;
      try {
        const result = attempt();
        if (result instanceof Promise) {
          result.then((result2) => {
            if (result2)
              resolve(result2);
            else if (tryIterate < maxTryIterate)
              setTimeout(attemptWithDelayInner, delayMs);
            else
              resolve(null);
          }).catch((e) => {
            if (tryIterate < maxTryIterate)
              setTimeout(attemptWithDelayInner, delayMs);
            else
              reject(e);
          });
        } else {
          if (result)
            resolve(result);
          else if (tryIterate < maxTryIterate)
            setTimeout(attemptWithDelayInner, delayMs);
          else
            resolve(null);
        }
      } catch (e) {
        if (tryIterate < maxTryIterate)
          setTimeout(attemptWithDelayInner, delayMs);
        else
          reject(e);
      }
    }
    attemptWithDelayInner();
  });
}
