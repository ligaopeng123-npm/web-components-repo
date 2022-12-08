# `feishuShareSdk`

> 书h5分享sdk封装

## Usage

```tsx
export const feishuShare = feishuShareSdk({
    "proxy_prefix": "/feishuAPI", // 处理跨域
    "app_id": process.env.REACT_APP_FEISHU_APP_ID as string,
    "app_secret": process.env.REACT_APP_FEISHU_APP_SECRET as string
});

// 调用分享
feishuShare.share({url, title, image, content, onSuccess});
// 判断当前环境是否可用
feishuShare.canShare();
```
