# card-ellipsis

`卡片多余内容支持展开和收`

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

