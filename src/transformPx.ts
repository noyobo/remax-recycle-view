import { getSystemInfoSync } from 'remax-wechat';

const BASE_DEVICE_WIDTH = 750;

const info = getSystemInfoSync();
const isIPhone = info.platform === 'ios';
const deviceWidth = info.screenWidth || 375;
const deviceDPR = info.pixelRatio || 2;

const eps = 1e-4;

export default (number) => {
  if (number === 0) {
    return 0;
  }
  number = (number / deviceWidth) * BASE_DEVICE_WIDTH;
  number = Math.floor(number + eps);

  if (number === 0) {
    if (deviceDPR === 1 || !isIPhone) {
      return 1;
    }
    return 0.5;
  }
  return number;
};

// 750rpx - 414px
