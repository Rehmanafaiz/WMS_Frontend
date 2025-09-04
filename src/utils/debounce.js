export function debounce(fn, delay = 300) {
  let t;
  return function(...args) {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), delay);
  };
}
