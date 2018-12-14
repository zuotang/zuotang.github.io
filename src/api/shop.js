import {host, get} from './http';

export async function shop({shop_no = '0264', query_type = 0, is_detail = 1}) {
  let url = `${host.cplus}/cgi-bin/mix/queryshop`;
  // throw new Error('请求错误!');
  let {data} = await get(url, {params: {a: 'a', shop_no, query_type, is_detail}});
  if (data.status != 0 || !data.shop_list) {
    throw new Error('门店不存在!');
  }
  return data.shop_list[0];
}

// 义诊讲座
export async function lecture({shop_id = '0264', page_size = 10, current_page = 1, platform = 1}) {
  let url = `${host.healthAdHost}/act/list`;
  // throw new Error('请求错误!');
  let {
    data: {data},
  } = await get(url, {params: {shop_id, page_size, current_page, platform}});
  return {
    list: data.list,
    page: data.current_page,
    totalPage: data.total_page,
  };
}

// 医生列表
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
