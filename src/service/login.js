import request from '@/utils/request';

export async function phoneLogin({ phone, smsCode }) {
  return request(`http://xxxxx:8002/smsLogin/login?phone=${phone}&smsCode=${smsCode}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`http://xxxxx:8002/smsLogin/sendMessage?phone=${mobile}`);
}
