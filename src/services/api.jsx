import axios from "axios";
import { logout } from "../shared/hooks/useLogout";

const ip = '192.168.6.21';

const apliClient = axios.create({
  //baseURL: 'https://node-js-kinal-cast-2024.vercel.app/twitch/v1',
  baseURL: `http://${ip}:3001/kinalCast/v2`,
  timeout:5000,
  httpsAgent: false,
});


apliClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem('user')
    

    if(userDetails){
      const token = JSON.parse(userDetails).token
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => {
    return Promise.reject(e)
  }
)

export const login = async (data) => {
  try {
    return await apliClient.post("/auth/login", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const register = async (data) => {
    try {
      return await apliClient.post("/auth/register", data);
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

  export const getChannelSettings = async () => {
    try{
      return await apliClient.get('/settings/channel')
    }catch(e){
      return{
        error: true,
        e
      }
    }
  }

  export const updateChnnelSettings = async (data) => {
    try{
      return await apliClient.put('/settings/channel', data)
    }catch(e){
      return {
        error: true,
        e
      }
    }
  }

  export const changePassword = async (data) => {
    try{
      return await apliClient.patch('/settings/password', data)
    }catch(e){
      return{
        error:true,
        e: e
      }
    }
  }

  export const getFolloweChannels = async () => {
    try{
      return await apliClient.get('/channels/followed')
    }catch(e){
      checkResponseStatus(e)
      return{
        error: true,
        e: e
      }
    }
  }

  export const getChannels = async () => {
    try{
      return await apliClient.get('/channels')
    }catch(e){
      return{
        error: true,
        e: e
      }
    }
  }

  export const getChannelsDetails = async (channelId) => {
    try{
      return await apliClient.get(`/channels/${channelId}`)
    }catch(e){
      return{
        error: true,
        e: e
      }
    }
  }

  export const followChannel = async (channelId) => {
    try{
      return await apliClient.post('/channels/follow',{channelId})
    }catch(e){
      return {
        error: true,
        e
      }
    }
  }

  const checkResponseStatus = (e) => {
    const responseStatus = e?.response?.status 

    if(responseStatus){
      (responseStatus === 401 || responseStatus === 403) && logout()
    }
  }