import { writable } from "svelte/store";

export const APP_STATUS = {
  INIT: 0,
  LOADING: 1,
  CHAT_MODE: 2,
  ERROR: -1,
}; 

// change to this code when you are not in test chat logic
// export const appStatus = writable(APP_STATUS.INIT); 
// export const appStatusInfo = writable({ id: '', url: '', pages: 0});

// use this when you want test chat logic without upload pdf in cloudinary
export const appStatus = writable(APP_STATUS.CHAT_MODE);
export const appStatusInfo = writable({ 
  id: 'e9944e0239fffb2585e8f1651a61e81f', 
  url: 'https://res.cloudinary.com/ddk7n8itw/image/upload/v1709835620/pdf/wh4oddrg1qamw8ltovxr.pdf', 
  pages: 1
});

export const setAppStatusLoading = () => {
  appStatus.set(APP_STATUS.LOADING);
};

export const setAppStatusError = () => {
  appStatus.set(APP_STATUS.ERROR);
};

export const setAppStatusChatMode = ({id, url, pages}: { id: string, url: string, pages: number}) => {
  appStatus.set(APP_STATUS.CHAT_MODE);
  appStatusInfo.set({ id, url, pages });
};