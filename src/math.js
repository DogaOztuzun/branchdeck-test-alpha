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
