# message

> 消息信息

## Usage

```typescript
import {initMsg} from “@gaopeng123/message”;

// 初始化message 避免全局变量
const message = initMsg();

// 全局设置message的属性
message.config = {

};

type MsgConfig = {
    type?: 'info' | 'warning' | 'success' | 'error' | 'loading',
    showClose?: boolean,
    timeout?: number,
    animation?: boolean,
    autoClose?: boolean,
    content?: string,
    onClose?: any,
    maxNums?: number,
    html?: string;
};

// API
message.info('', config as MsgConfig);
message.warning('', config as MsgConfig);
message.success('', config as MsgConfig);
message.error('', config as MsgConfig);
message.loading('', config as MsgConfig);
```

