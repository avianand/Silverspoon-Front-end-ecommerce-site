import axios from './axios';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON);
// }
export default async function request(
  method,
  url,
  payload = null,   
  headers = 1,
) {
    // console.log('request url: ', url);
    const requestData = {
      method,
      url,
    };
    if (payload) {
      requestData.data = payload;
    }
     
    if (headers === 1) {
      requestData.headers = {
        Authorization : window.localStorage.getItem('accessToken')
      };
    } 
    else {
      requestData.headers = {
        Authorization: 'NO_TOKEN',
      };
    }
    const response = await axios(requestData);
    
    return response;
  }

export async function requestCustomer(
  method,
  url,
  payload = null,
  headers = 1,
) {
//   const cookie = new Cookies();

  const requestData = {
    method,
    url,
  };
  if (payload) {
    requestData.data = payload;
  }
  if (headers === 1) {
    requestData.headers = {
      // 'Access-Control-Allow-Origin': '*',
    //   Authorization: cookie.get('customertoken'),
     Authorization : window.localStorage.getItem('accessToken')
    };
  } 
//   else {
//     requestData.headers = {
//       Authorization: 'NO_TOKEN',
//     };
//   }
  const response = await axios(requestData);

  return response;
}

