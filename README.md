YoTest-React-SDK 文档
----
<a href="https://www.npmjs.com/package/yotest-react-sdk"><img src="https://img.shields.io/npm/v/yotest-react-sdk.svg?sanitize=true" alt="Version"></a>

> 基于设备特征识别和操作行为识别的新一代智能验证码，具备智能评分、抗Headless、模拟伪装、针对恶意设备自动提升验证难度等多项安全措施，帮助开发者减少恶意攻击导致的数字资产损失，强力护航业务安全。

* [仓库入口](https://github.com/YoTest-team/YoTest-React-SDK#%E4%BB%93%E5%BA%93%E5%85%A5%E5%8F%A3)
* [兼容性](https://github.com/YoTest-team/YoTest-React-SDK#%E5%85%BC%E5%AE%B9%E6%80%A7)
* [安装](https://github.com/YoTest-team/YoTest-Web-SDK#%E5%AE%89%E8%A3%85)
* [快速开始](https://github.com/YoTest-team/YoTest-React-SDK#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)
* [验证模式](https://github.com/YoTest-team/YoTest-React-SDK#%E9%AA%8C%E8%AF%81%E6%A8%A1%E5%BC%8F)
* [API](https://github.com/YoTest-team/YoTest-React-SDK#api)

### 仓库入口：
<a href="https://gitee.com/yo-test-team/yo-test-react-sdk"><img src="./images/gitee2.png" width="30px"/></a>&nbsp;&nbsp;
<a href="https://github.com/YoTest-team/YoTest-React-SDK"><img src="./images/GitHub.png" width="32px"/></a>

### 兼容性

* React 17+

### 安装

> npm install yotest-react-sdk --save

### 快速开始

当你使用 npm 进行安装后，你可以通过 import 直接引入

```typescript
import React from "react";
import useYoTest from "yotest-react-sdk";

export default function App() {
  const { captcha } = useYoTest({
    accessId: "your accessId",
    style: {
      width: 300,
      height: 40,
    },
    onSuccess({ token, verified }) {
      console.log("success", token, verified);
    },
    onError({ code, message }) {
      console.log("error", code, message);
    },
  });
  
  return <div className="App">{captcha}</div>;
};
```

### 验证模式

- 浮动式，默认 PC 展现形式，移动端不支持此模式，展示为弹窗式，设置 product: "float" 时生效

![float](./images/float.gif)

```typescript
import React from "react";
import useYoTest from "yotest-react-sdk";

export default function App() {
  const { captcha } = useYoTest({
    accessId: "your accessId",
    product: "float",
    style: {
      width: 300,
      height: 40,
    },
    onSuccess({ token, verified }) {
      console.log("success", token, verified);
    },
    onError({ code, message }) {
      console.log("error", code, message);
    },
  });
  
  return <div className="App">{captcha}</div>;
};
```

- 弹窗式，设置 product: "popup" 时生效

![popup](./images/popup.gif)

```typescript
import React from "react";
import useYoTest from "yotest-react-sdk";

export default function App() {
  const { captcha } = useYoTest({
    accessId: "your accessId",
    product: "popup",
    style: {
      width: 300,
      height: 40,
    },
    onSuccess({ token, verified }) {
      console.log("success", token, verified);
    },
    onError({ code, message }) {
      console.log("error", code, message);
    },
  });
  
  return <div className="App">{captcha}</div>;
};
```

- 隐藏式，设置 product: "bind" 时生效，同时需要在 onReady 之后自行调用 [verify](https://github.com/YoTest-team/YoTest-Vue-SDK#verify) 方法进行展现

![bind](./images/bind.gif)

```typescript
import React from "react";
import useYoTest from "yotest-react-sdk";

export default function App() {
  const { captcha, verify } = useYoTest({
    accessId: "your accessId",
    product: "bind",
    style: {
      width: 300,
      height: 40,
    },
    onReady() {
      // 你也可以绑定事件，但需要注意：
      // 一定要在onReady之后进行verify的调用
      verify();
    },
    onSuccess({ token, verified }) {
      console.log("success", token, verified);
    },
    onError({ code, message }) {
      console.log("error", code, message);
    },
  });
  
  return <div className="App">{captcha}</div>;
};
```

- 自定义式，设置 product: "custom" 时生效，同时需要设置 [area](https://github.com/YoTest-team/YoTest-Vue-SDK#area-string) 参数

![custom](./images/custom.gif)

```typescript
import React from "react";
import useYoTest from "yotest-react-sdk";

export default function App() {
  const { captcha } = useYoTest({
    accessId: "your accessId",
    product: "custom",
    area: ".App",
    bgColor: "red",
    style: {
      width: 300,
      height: 40,
    },
    onSuccess({ token, verified }) {
      console.log("success", token, verified);
    },
    onError({ code, message }) {
      console.log("error", code, message);
    },
  });
  
  return <div className="App">{captcha}</div>;
};
```

### API

### useYoTest(props)

- `props` \<Object\>
  - **accessId** \<String\> 必填，当前项目所属的accessId，可以在优验后台中进行相关获取及查看
  - **product** \<String\> 可选，默认值float，设置验证码的展现形式，其值包括浮动式（float）、弹出式（popup）、绑定式（bind）、自定义式（custom）四种，具体形式可通过 [验证模式](https://github.com/YoTest-team/YoTest-React-SDK#%E9%AA%8C%E8%AF%81%E6%A8%A1%E5%BC%8F) 进行选择。需要注意的是，移动端由于屏幕展现原因，是无法展现浮动式（float）的
  - **area** \<String\> 可选，仅当 product: "custom" 生效，其作用为设置验证区域。需要注意的是，请确保对应的DOM元素存在，且符合CSS Selector的规范（例如：#id、.class、tagName及其组合均为合法）
  - **bgColor** \<String\> 可选，仅当 product: "custom" 生效，其设置对应验证区域的背景，支持HEX、RGB及RGBA的颜色格式
  - **enforced** \<String\> 可选，默认值false，强制每一次都进行验证，取消无感验证
  - **style** \<CSSProperties\> 可选，自定义的CSS样式
  - [**onReady** \<() => void\>]()
  - [**onSuccess** \<({ token:String, verified:Boolean }) => void\>]()
  - [**onError** \<({ code:Number, message:String }) => void\>]()
  - [**onClose** \<() => void\>]()
- `return:`
  - **captcha** \<React.component\> 优验的UI DOM，需要放入其他的React组件之中
  - [**render** \<() => React.component\>]()
  - [**getValidate** \<() => ValidateResult | void\>]()
  - [**reset** \<() => void\>]()
  - [**verify** \<() => void\>]()

### onReady() => void

### onSuccess({ token:String, verified:Boolean }) => void

### onError({ code:Number, message:String }) => void

### onClose() => void

### render() => React.component

### getValidate() => ValidateResult | void

### reset() => void

### verify() => void