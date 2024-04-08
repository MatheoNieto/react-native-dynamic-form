export const useCombinedRefs = (...refs: Array<any>) => {
  return (target: any) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(target);
      } else {
        ref.current = target;
      }
    });
  };
};
