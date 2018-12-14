/**
 * 客户端共用工具
 */
import Cookie from 'js-cookie';

// 过滤抖动 */
export const filteringJitter = (space = 200) => {
  let timer, previousReject;
  return () => {
    return new Promise((resolve, reject) => {
      if (timer) {
        clearTimeout(timer);
      }
      if (previousReject) {
        previousReject();
        previousReject = null;
      }
      timer = setTimeout(resolve, space);
      previousReject = reject;
    });
  };
};
// 本地存储包装器 type不传默认为 localStorage, 传 session 为 sessionStorage */
export const storage = {
  checkWindow() {
    if (!window) {
      console.warn('[Storage] === Storage can ONLY used in browser.');
      return false;
    }
    return true;
  },
  checkSupport(type) {
    let winFlag = this.checkWindow();
    if (winFlag && window[type]) {
      return true;
    } else {
      console.warn(`[Storage] === ${type} Storage is NOT supported.`);
      return false;
    }
  },
  checkType(type) {
    if (type && type === 'session') {
      return 'sessionStorage';
    } else {
      return 'localStorage';
    }
  },
  set(key, value, type) {
    let target = this.checkType(type);
    if (this.checkSupport(target)) {
      return window[target].setItem(key, JSON.stringify(value));
    }
  },
  get(key, type) {
    let target = this.checkType(type);
    if (this.checkSupport(target)) {
      if (window[target][key] && window[target][key] !== 'undefined') {
        return JSON.parse(window[target][key]);
      } else {
        return window[target][key];
      }
    }
  },
  remove(key, type) {
    let target = this.checkType(type);
    if (this.checkSupport(target)) {
      if (window[target][key] && window[target][key] !== 'undefined') {
        return window[target].removeItem(key);
      }
    }
  },
};
// 价格转换 */
export const convertPrice = (price, fixFlag) => {
  if (price < 100) {
    return fixFlag ? '0' : '0.00';
  } else {
    price = Math.floor(price / 100) * 100;
    return fixFlag ? Number.parseInt(price) / 10000 : (Number.parseInt(price) / 10000).toFixed(2);
  }
};
// 去除微信弹性下拉 */
export const clearOverScroll = element => {
  const overScroll = function(el) {
    el.addEventListener('touchstart', function() {
      const top = el.scrollTop,
        totalScroll = el.scrollHeight,
        currentScroll = top + el.offsetHeight;
      //If we're at the top or the bottom of the containers
      //scroll, push up or down one pixel.
      //
      //this prevents the scroll from "passing through" to
      //the body.
      if (top === 0) {
        el.scrollTop = 1;
      } else if (currentScroll === totalScroll) {
        el.scrollTop = top - 1;
      }
    });
    el.addEventListener('touchmove', function(evt) {
      //if the content is actually scrollable, i.e. the content is long enough
      //that scrolling can occur
      if (el.offsetHeight < el.scrollHeight) evt._isScroller = true;
    });
  };
  overScroll(document.querySelector(element));
  document.body.addEventListener('touchmove', function(evt) {
    //In this case, the default behavior is scrolling the body, which
    //would result in an overflow.  Since we don't want that, we preventDefault.
    if (!evt._isScroller) {
      evt.preventDefault();
    }
  });
};
// 返回是否浏览器环境 */
export const isBrowser = () => {
  return !(typeof window == 'undefined');
};
// 返回是否微信环境 */
export const isWeixin = () => {
  if (!isBrowser()) return false;
  let ua = window.navigator.userAgent;
  return /MicroMessenger/i.test(ua);
};
// 获取平台 */
export const getPlatform = () => {
  return Cookie.get('platform');
};
// 获取渠道 */
export const getChannel = () => {
  return Cookie.get('channel');
};

/**********用户/登录相关 start**************/
// 从cookie中取用户信息,返回用户对象 */
export function getUser() {
  if (typeof document !== 'undefined' && window) {
    return {
      user_id: Cookie.get('userid') || Cookie.get('user_id') || false,
      login_id: Cookie.get('loginid') || Cookie.get('login_id') || false,
      open_id: Cookie.get('openid') || Cookie.get('open_id') || '',
      token: Cookie.get('wxCacheKey') || Cookie.get('wxCacheKey') || '',
      wxSource: Cookie.get('wxSource') || Cookie.get('wxSource') || '1', //微信公众号来源，用于区分大小号
      wxDomain: Cookie.get('wxDomain') || Cookie.get('wxDomain') || '', //微信认证域名
      user_role: Cookie.get('user_role') || false, //用户所有角色:十进制合成值,多角色累加得到
      cur_role: Cookie.get('role') || false, //当前角色: 位移值,1<<x
      doctor_id: Cookie.get('doctor_id') || false, //如果是医生,则有医生id
      assistant_id: Cookie.get('assistant_id') || false, //如果是医助,则有医助id
      user_image: Cookie.get('user_image') || false, //用户头像缓存
      userLocation: Cookie.get('userLocation') || false, //用户头像缓存
    };
  } else {
    return {};
  }
}
// 清理当前用户信息 */
export function cleanUser() {
  let aInfo = [
    'userid',
    'user_id',
    'openid',
    'open_id',
    'WXCacheKey',
    'wxCacheKey',
    'city',
    'user_role',
    'role',
    'doctor_id',
    'assistant_id',
    'user_image',
  ];
  aInfo.forEach(key => {
    Cookie.remove(key, {domain: window._second_domain_});
    Cookie.remove(key);
  });
  storage.remove('Location', 'local');
  storage.remove('AREA-INFO', 'local'); //清理位置信息
  storage.remove('PATIENT_INFO', 'local'); //清理默认就诊人
}
/**********用户/登录相关 end**************/


// fn是我们需要包装的事件回调, delay是时间间隔的阈值
export function throttle(fn, delay) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0, timer = null
  // 将throttle处理结果当作函数返回
  
  return function () { 
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()
    
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
    // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
       clearTimeout(timer)
       timer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, delay)
    } else {
        // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
        last = now
        fn.apply(context, args)
    }
  }
}

/**
 * @desc 链接数组对象里的某个属性,并返回一个数组，如 [{mis_doctor_id:123},{mis_doctor_id:3497}] 返回数组[123, 3497]
 * @param arr
 * @param prop
 * @returns {Array}
 */
export function getArrProp(arr, prop){
  let result=[];
  if(!arr) return result;
  for(let i=0; i<arr.length; i++){
    result.push(arr[i][prop])
  }
  return result;
}