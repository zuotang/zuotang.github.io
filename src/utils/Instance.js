//单例只存放需要初始的方法
class Singleton {
  static instance = null;
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
  static showAll() {
    console.log(Object.keys(Singleton.instance));
  }
  //添加方法到单例
  static addMethod(method, name) {
    const instance = Singleton.getInstance();
    if (!name) name = method.name;
    if (!name) {
      console.error('单例:方法未指定名称');
      return;
    }
    instance[name] = method;
  }
  //获取单例中的方法
  static getMethod(name) {
    const instance = Singleton.getInstance();
    /*if(!Singleton[name]){
			console.error(`单列:${name}方法不存在`);
			return;
		}*/
    return Singleton[name];
  }
}
export default Singleton;
