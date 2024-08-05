import axios from 'axios';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
const urlGiaoViec = process.env.NEXT_PUBLIC_URL_GV;
const urlQLC = process.env.NEXT_PUBLIC_URL_QLC;
const urlQLTS = process.env.NEXT_PUBLIC_URL_QLTS;

export const getCurrentToken = () => {
  let token = '';
  const currentAccessToken = getCookie('inForUser');
  if (currentAccessToken) {
    token =
      currentAccessToken?.access_token ||
      JSON?.parse(currentAccessToken)?.access_token;
    // token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTAwMDA0ODAsImlkVGltVmllYzM2NSI6MTExMTExMTQ3MywiaWRRTEMiOjEwMDAwMzA3LCJpZFJhb05oYW5oMzY1IjoxMDAwMDMwNywiZW1haWwiOm51bGwsInBob25lVEsiOiIwOTIzOTAzNjQ5IiwiY3JlYXRlZEF0IjoxNjk0MTM2MjE2LCJ0eXBlIjoyLCJjb21faWQiOjEwMzA4OTgsInVzZXJOYW1lIjoiQlY5In0sImlhdCI6MTY5NDU5MDAxNSwiZXhwIjoxNjk0Njc2NDE1fQ.nWEH-mF4gpqMzrKzaFVT_mK6Rvu-s26LMXajBd4sFfg"
    token =
      currentAccessToken?.access_token ||
      JSON.parse(currentAccessToken)?.access_token;
  }
  //console.log(currentAccessToken)
  // const tokenJson = currentAccessToken && JSON.parse(`${currentAccessToken}`)
  return token;
};
export const getType = () => {
  let token = '';
  const currentAccessToken = getCookie('inForUser');
  if (currentAccessToken) {
    token =
      currentAccessToken?.type?.toString() ||
      JSON.parse(currentAccessToken)?.type?.toString();
  }
  return token;
};

export const getCurrentID = () => {
  let id = '';
  const currentID = getCookie('inForUser');
  if (currentID) {
    id = currentID?._id || JSON.parse(currentID)?._id;
  }
  return id;
};
export const getComId = () => {
  const currentAccessToken = getCookie('inForUser');
  if (currentAccessToken) {
    let com_id =
      currentAccessToken?.user_info?.com_id ||
      JSON.parse(currentAccessToken)?.user_info?.com_id;
    return com_id;
  }
};

export const getName = () => {
  const currentAccessToken = getCookie('inForUser');
  if (currentAccessToken) {
    let name =
      currentAccessToken?.user_info?.com_name ||
      JSON.parse(currentAccessToken)?.user_info?.com_name;
    return name;
  }
};
// export default async (req, res) => {
//   const { username } = req.body;
//   //const username = 'company'
//   // Thực hiện xác thực tài khoản công ty
//   if (username === "company") {
//     res.status(200).json({ id: 1, name: "Công Ty", role: "company" });
//   }
//   // Thực hiện xác thực tài khoản nhân viên
//   else if (username === "employee") {
//     res.status(200).json({ id: 2, name: "Nhân Viên", role: "employee" });
//   } else {
//     res.status(401).json({ error: "Invalid credentials" });
//   }
// };
export const LOGIN = async (url, body) => {
  try {
    const res = await axios.post(`${urlQLC}/${url}`, body);
    if (res?.status === 200) {
      return res?.data?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const POST = async (url, body) => {
  const currentToken = getCurrentToken();
  //console.log(currentToken)
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  };
  try {
    const res = await axios.post(`${urlGiaoViec}/${url}`, body, config);
    if (res?.status === 200) {
      return res?.data?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const GET_EXCEL = (url) => {
  return `${urlGiaoViec}/${url}`;
};
export const POST_PARAM = async (url, body, params) => {
  const currentToken = getCurrentToken();
  // console.log(currentToken)
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  };

  try {
    const res = await axios.post(
      `${urlGiaoViec}/${url}/${params}`,
      body,
      config
    );
    if (res?.status === 200) {
      return res?.data?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const POST_PARAM_QUERY = async (url, body, params) => {
  const currentToken = getCurrentToken();
  // console.log(currentToken)
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
    params: params,
  };

  try {
    const res = await axios.post(`${urlGiaoViec}/${url}`, body, config);
    if (res?.status === 200) {
      return res?.data?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const POST_QLC = async (url, body) => {
  const currentToken = getCurrentToken();
  //console.log(currentToken)
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  };
  try {
    const res = await axios.post(`${urlQLC}/${url}`, body, config);
    if (res?.status === 200) {
      return res?.data?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const POST_QLTS = async (url, body) => {
  const currentToken = getCurrentToken();
  //console.log(currentToken)
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  };
  try {
    const res = await axios.post(
      `${urlQLTS}/${url}`,
      { ...body, com_id: getComId() },
      config
    );
    if (res?.status === 200) {
      return res?.data?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const POST_QLC_NoCom = async (url, body) => {
  const currentToken = getCurrentToken();
  //console.log(currentToken)
  const config = {
    headers: { Authorization: `Bearer ${currentToken}` },
  };
  try {
    const res = await axios.post(
      `${urlQLC}/${url}`,
      { ...body, com_id: getComId() },
      config
    );
    if (res?.status === 200) {
      return res?.data?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
