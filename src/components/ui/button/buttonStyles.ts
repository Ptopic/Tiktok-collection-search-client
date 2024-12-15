export enum BUTTON_VARIANT {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  DESTRUCTIVE = 'destructive',
  LINK = 'link',
}

export const BUTTON_VARIANT_CLASSNAME = {
  [BUTTON_VARIANT.PRIMARY]: 'border border-black bg-transparent text-black',
  [BUTTON_VARIANT.SECONDARY]: '',
  [BUTTON_VARIANT.TERTIARY]: '',
  [BUTTON_VARIANT.DESTRUCTIVE]: 'border border-red100 bg-red50 text-red800',
  [BUTTON_VARIANT.LINK]: 'text-black border-none bg-transparent !p-0',
};

export enum BUTTON_SIZE {
  BIG = 'big',
  REGULAR = 'regular',
  SMALL = 'small',
}

export const BUTTON_SIZE_CLASSNAME = {
  [BUTTON_SIZE.BIG]: 'p-4 gap-3 body-regular-bold rounded-lg',
  [BUTTON_SIZE.REGULAR]: 'px-4 py-2 gap-2 body-small-bold rounded-lg',
  [BUTTON_SIZE.SMALL]: 'p-1 gap-2 rounded-lg',
};
