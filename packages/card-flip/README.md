# card-flip

`翻转动画`[在线demo](https://ligaopeng123-npm.github.io/web-components-repo/?path=/story/example-cardflip--props)  

## Usage

```typescript
export type CardFlipConfig = {
    height?: string | number; // 高度
    width?: string | number; // 宽度
    type?: 'x' | 'y' // 翻转的方向
};
```

```html
<style>
  #front {
    height: 100%;
    background-image: url(https://picsum.photos/200/300?k=1);
  }

  #back {
    height: 100%;
    background-image: url(https://picsum.photos/200/300?k=2);
  }
</style>

<card-flip height="300" width="200" type="x">
  <div slot="front" id="front"> front</div>
  <div slot="back" id="back"> back</div>
</card-flip>
```

