const TRANSCRIBE_VIDEO_TOKEN = 'transcribe-video-token';


export const getToken = () => {
  const token = localStorage.getItem(TRANSCRIBE_VIDEO_TOKEN);
  return token ?? '';
};

export const saveToken = (token)=> {
  localStorage.setItem(TRANSCRIBE_VIDEO_TOKEN, token);
};

export const dropToken = () => {
  localStorage.removeItem(TRANSCRIBE_VIDEO_TOKEN);
};