```json data
{
  "date": "2019/2/12",
  "categories": ["技术"],
  "description": "react hooks 父级调用子级方法",
  "thumbnail": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544809648282&di=ec308f39dd0da28df03245447be85921&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201412%2F04%2F20141204151458_TE52s.thumb.700_0.jpeg"
}
```

# react hooks 父级调用子级方法

```javascript
import React, {forwardRef, useRef, useImperativeHandle} from 'react';

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const Child = forwardRef((props, ref) => {
  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    getAlert() {
      alert('getAlert from Child');
    },
  }));

  return <h1>Hi</h1>;
});

const Parent = () => {
  // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  const childRef = useRef();

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={() => childRef.current.getAlert()}>Click</button>
    </div>
  );
};
```
