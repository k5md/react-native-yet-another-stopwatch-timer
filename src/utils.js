export const getDeciseconds = function(interval, counter, modulo = 10) {
  'worklet';
  return Math.floor((counter * interval) / 100) % modulo;
};

export const getSeconds = function(interval, counter, modulo = 60) {
  'worklet';
  return Math.floor((counter * interval) / 1000) % modulo;
};

export const getMinutes = function(interval, counter, modulo = 60) {
  'worklet';
  return Math.floor((counter * interval) / 60000) % modulo;
}

export const getHours = function(interval, counter, modulo = 24) {
  'worklet';
  return Math.floor((counter * interval) / 3600000) % modulo;
};
