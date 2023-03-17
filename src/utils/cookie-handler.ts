import { Cookies } from 'react-cookie';

export const removeCookie = (name: string) => {
  const cookies = new Cookies();
  if (cookies.get(name)) {
    cookies.remove(name, { path: '/' });
    return true;
  }
  return false;
};

export const setCookie = (name: string, value: string) => {
  removeCookie(name);
  const cookies = new Cookies();
  cookies.set(name, value, { path: '/' });
};

export const getCookie = (name: string) => {
  const cookies = new Cookies();
  return cookies.get(name);
};
