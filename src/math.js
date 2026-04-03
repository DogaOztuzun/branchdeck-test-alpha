function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function power(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }
  
  if (b < 0) {
    if (a === 0) throw new Error('Cannot raise 0 to a negative power');
    return 1 / Math.pow(a, -b);
  }
  
  if (a === 0) {
    if (b === 0) throw new Error('Zero to the power of zero is undefined');
    return 0;
  }
  
  if (!Number.isInteger(b) && a < 0) {
    throw new Error('Cannot calculate fractional power of negative number');
  }
  
  if (b > 1000 || b < -1000) {
    throw new Error('Exponent too large, potential overflow');
  }
  
  return Math.pow(a, b);
}

function absoluteValue(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }
  
  return Math.abs(a - b);
}

function max(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }
  
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return NaN;
  }
  
  if (a === b) {
    return a;
  }
  
  return a > b ? a : b;
}

function min(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both parameters must be numbers');
  }
  
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return NaN;
  }
  
  if (a === b) {
    return a;
  }
  
  return a < b ? a : b;
}

module.exports = { subtract, divide, multiply, power, absoluteValue, max, min };

function abs(x) {
  if (typeof x !== 'number') {
    throw new Error('Parameter must be a number');
  }
  
  if (Number.isNaN(x)) {
    return NaN;
  }
  
  if (x === Infinity || x === -Infinity) {
    return Infinity;
  }
  
  return Math.abs(x);
}

module.exports = { subtract, divide, multiply, power, absoluteValue, max, min, abs };

function clamp(value, min, max) {
  if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('All parameters must be numbers');
  }
  
  if (Number.isNaN(value) || Number.isNaN(min) || Number.isNaN(max)) {
    return NaN;
  }
  
  // Swap min and max if min > max
  let actualMin = min;
  let actualMax = max;
  if (min > max) {
    actualMin = max;
    actualMax = min;
  }
  
  if (value < actualMin) return actualMin;
  if (value > actualMax) return actualMax;
  return value;
}

module.exports = { subtract, divide, multiply, power, absoluteValue, max, min, abs, clamp };

function median(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Parameter must be an array');
  }
  
  if (arr.length === 0) {
    throw new Error('Array must not be empty');
  }
  
  // Validate all elements are numbers
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'number') {
      throw new Error('All array elements must be numbers');
    }
  }
  
  // Handle single element
  if (arr.length === 1) {
    return arr[0];
  }
  
  // Sort a copy of the array
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  // Odd length: return middle element
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  
  // Even length: return average of two middle elements
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

module.exports = { subtract, divide, multiply, power, absoluteValue, max, min, abs, clamp, median };

function round(value, decimals) {
  if (typeof value !== 'number') {
    throw new Error('Value must be a number');
  }
  
  if (decimals !== undefined && typeof decimals !== 'number') {
    throw new Error('Decimals must be a number');
  }
  
  if (Number.isNaN(value)) {
    return NaN;
  }
  
  if (value === Infinity || value === -Infinity) {
    return value;
  }
  
  const dec = decimals !== undefined ? Math.max(0, Math.floor(decimals)) : 0;
  const factor = Math.pow(10, dec);
  return Math.round(value * factor) / factor;
}

module.exports = { subtract, divide, multiply, power, absoluteValue, max, min, abs, clamp, median, round };

function floor(value) {
  if (typeof value !== 'number') {
    throw new Error('Parameter must be a number');
  }
  
  if (Number.isNaN(value)) {
    return NaN;
  }
  
  if (value === Infinity || value === -Infinity) {
    return value;
  }
  
  return Math.floor(value);
}

module.exports = { subtract, divide, multiply, power, absoluteValue, max, min, abs, clamp, median, round, floor };

function ceil(value) {
  if (typeof value !== 'number') {
    throw new Error('Parameter must be a number');
  }
  
  if (Number.isNaN(value)) {
    return NaN;
  }
  
  if (value === Infinity || value === -Infinity) {
    return value;
  }
  
  return Math.ceil(value);
}

module.exports = { subtract, divide, multiply, power, absoluteValue, max, min, abs, clamp, median, round, floor, ceil };
