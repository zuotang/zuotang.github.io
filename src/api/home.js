import {host, get} from './http';

export async function banner({city_no = '020', platform = '1'}) {
  let url = `${host.banner}/Interface/getbanner`;
  let res = await get(url, {params: {city_no, platform}});
  return {list: res.data.data};
}

export async function doctorList({query_type = 1, page_no = 1, page_size = 2, city_no = '020', doctor_sign = 32, is_front_page = 1, order = 1}) {
  let url = `${host.cplus}/cgi-bin/user/querydoctorsthlist`;
  // throw new Error('请求错误!');
  let res = await get(url, {params: {query_type, page_no, page_size, city_no, doctor_sign, is_front_page, order}});
  let {data} = res;
  return {
    list: data.doctor_sth_list,
    page: data.current_page,
    totalPage: data.total_page,
  };
}
