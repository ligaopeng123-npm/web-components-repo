# `scroll-nav`

> TODO: 吸顶导航

## 参数

| 参数                                     | 说明      | 类型                                                         | 默认值  |
| ---------------------------------------- | --------- | ------------------------------------------------------------ | ------- |
| primary-color                            | 主色      | string                                                       | #387af6 |
| text-color<br />--text-color             | 字体颜色  | string                                                       | #000000 |
| background-color<br />--background-color | 背景色    | string                                                       | #ffffff |
| items                                    | 导航数据  | type ScrollNavItem = {     label: string,     value: string, }<br />Array<ScrollNavItem> |         |
| scroll-dom                               | 滚动条dom | string                                                       | body    |




## Usage

```
<scroll-nav text-color="#000000">
    <div class="nav-content-container" slot="content">
        <div id="a" class="content content1">Web1</div>
        <div id="b" class="content content2">Web2</div>
        <div id="c" class="content content3">Web3</div>
    </div>
</scroll-nav>

<script>
const nav = document.querySelector('scroll-nav');
nav.setAttribute('items', JSON.stringify([{label: 'Web1', value: 'a'},
        {label: 'Web2', value: 'b'}, {label: 'Web3', value: 'c'}]))
</script>
```
