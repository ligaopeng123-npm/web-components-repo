# card-ellipsis

`卡片多余内容支持展开和收`[在线demo](https://ligaopeng123-npm.github.io/web-components-repo/?path=/docs/example-cardellipsis--props)  

## Usage

```html
card-ellipsis {
    --text-color: #1677ff;
  	--border-color: #bfbfbf;
		// 使用文字
		--expand-text: '更多';
		--collapse-text: '收起';
		// 使用图标
		--expand-image: url(~@/assets/img/expand.png);
		--expand-text: '';
		--collapse-image: url(~@/assets/img/collapse.png);
		--collapse-text: '';
}

//  最小高度
// min-height 默认100
// 简单模式为 slot比较简单 可以监听dam变化 添加过渡动画，复杂dom结构无法监听内部节点变化 获取不到高度，此时没有动画
// mode 'simple' | 'complex'  默认complex

<card-ellipsis min-height="140">
    <div slot="content">
        12121212</br>
        12121212</br>
        12121212</br>
        12121212</br>
        12121212</br>
        12121212</br>
        12121212</br>
        12121212</br>
        12121212</br>
        12121212</br>
        12121212</br>
        12121212</br>
    </div>
</card-ellipsis>
```

