import {
  checkElementType,
  generateClassName,
  chooseSrc,
  generateFilter,
} from '../utils/main';

describe('Tests for [UTILS] functions', () => {
  it('[checkElementType] should return [true]', () => {
    const result = checkElementType('div');
    expect(result).toBe(true);
  });
  it('[checkElementType] should return [false]', () => {
    const result = checkElementType('notDiv');
    expect(result).toBe(false);
  });
  it('[generateClassName] should be equal [output]', () => {
    const result = generateClassName(['className1', 'className2'], '_');
    const output = 'className1_className2';
    expect(result).toEqual(output);
  });
  it('[chooseSrc] should return [output]', () => {
    const result = chooseSrc('srcExample');
    const output = { currentSrc: 'srcExample', blured: true };
    expect(result).toEqual(output);
  });
  it('[generateFilter] should return [output]', () => {
    const result = generateFilter(1, false);
    const output = 'grayscale(1)';
    expect(result).toEqual(output);
  });
  it('[generateFilter] should return [output] (another)', () => {
    const result = generateFilter(1, true);
    const output = 'grayscale(1) blur(5px)';
    expect(result).toEqual(output);
  });
});
