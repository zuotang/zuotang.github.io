import {host, get} from './http';
// 评论标签
export async function evaluateTag({clinic_id = '0251', page_no = 1, page_size = 999}) {
  let url = `${host.cplus}/cgi-bin/comment/queryclinictaginfo`;
  let {data} = await get(url, {params: {clinic_id, page_no, page_size}});
  return {list: data.data};
}

export async function comment({clinic_id = '0251', tag_id, from = 1, page_no = 1, page_size = 10}) {
  let url = `${host.cplus}/cgi-bin/comment/querycommentlistbytag`;
  let {data} = await get(url, {params: {clinic_id, tag_id, from, page_no, page_size}});
  return {
    list: data.data,
    page: data.current_page,
    totalPage: data.total_page,
  };
}
