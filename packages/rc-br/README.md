# `rc-br`

> 换行插件，将textArea数据换行展示
>
> Br 换行组件

## 参数

| 参数            | 属性                                                       | 默认值                               |
| --------------- | ---------------------------------------------------------- | ------------------------------------ |
| text            | 需要处理和解析的文本                                       | string\|Array<any>string\|Array<any> |
| render          | 额外处理文本                                               | ()=> ReactNode \| string             |
| maxRow          | 最多显示行数，大于该行数显示更多                           | number                               |
| maxLength       | 最多显示字符数，大于该行数显示更多                         | number                               |
| handleMoreClick | 点击更多的回调                                             | (rows: Array<any>) => void           |
| onMoreClick     | 点击更多时的函数，传入该函数冲点更多逻辑，需要自己实现更多 | (rows: Array<any>) => void           |



## Usage

![demo](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdEAAABiCAYAAAAP6un0AAAOJ0lEQVR4nO3dT3LaSBvH8Z/yZmaSmpryZGd2PobZ+QZiCbsscwQ4QesIWWYnlnADdtIx2IlVTMZDJe9MTL8LSaA/DRay8wZb30+VqhLR3VJXWXp4uhvJ22w2drvd6v7+XhcXFwIAAM28+tknAADAc0UQBQCgJYIoAAAtEUQBAGiJIAoAQEsEUQAAWiKIAgDQEkEUAICWCKIAALREEAVw1uLAk+cVt4GmK1fJlaaDatlAsbvRSjlPA2ejJ7S5mmpQadMLnCVP6BPO3mazsXd3d3a9XlsAOCeRkZVcm2/DpFgysaF/qKyxUbnRA+Vk/VKjJ7SZhNY/0KZMqeQJfcJzQCYK4KyZyMra/RYZSZpruqimbr7CpFg2UehL0kSLakJoolKbNm1U8+lCq7Zt+qGSYptJqLToopa5Nu8Tzh6ZKIBnJc/6KhmeU5Z1+g+meHnWWckwH9VmnnU2yDBP6RPOyqMyUeYqAPxYjuu8N9LcWTZWUL3O+xN3q9NB5TrvaeRstHmbrnuXu+gpfcLZa5uJMlcB4IdyXLt+mLizNse9w0TWkTU67h1+aBNXJtq4Tde9I22nlome0ic8C4/KRJmrAPCjrBZTzVW+JmfDS2m5rGVt8WKi6j1hfC2tlnG1UU3TRvfX+WyoSy21nLdsU7HSosX7zFjXWql++OZ9wjPxpHOizFUAeCJ5dle+niNraiNJ++yydJkWsr5dG3l26Ye21KopZ5AntbnbV75HJaFfG8lq3ic8F4/IRJmrAPDjXN9ko1CjXuGa7EthNpK0c6mbYbpn0i9eu1MNQ1NtVOng0ki94v1AYTaS1aLNyxsNs1GwfqHN3nSo+uGb9gnPRbsguppqUAlufpjsh0mL4kCe11cxZploP0xbaFTTgadeuVElu2HaNm1mC4VKEdMo2g3TtuwTgB/vely7pk1kNb6pF70czpSUbhS+wmSm4VWtUY1tpFKrJpJ1NNq8zUsNZ5X7lB8qmQ1VP3zzPuGZaDOcmw9T1EYe8qGSwgeHhk3zNmpDIvVGs6GO/VBJ4zbzupWhm/1Qzb6NU/oEAIC1LYdzl9kMfLwsLraJFdTGSPOJ9bmWy+LuqT5Ux2jzifV4WVpAFAfljPOkNlfLdOHQfKly0Q+1IeLmfQIAINUqiDJXAQBA2zlR5ioAAJC32WzsdrvV/f29Li4ufvb5AADwbPAAegAAWiKIAgDQEkEUAICWCKIAALREEAUAoCWCKAAALRFEAQBoiSAKAEBLBFEAAFoiiAI4U/n7fYP0RRJNamTvIw6aVsjeNTyYrh4um1ZI32M8mKpZjW72oUsIogAAtEQQBQCgJYIozkf8RZ53K29w13CYCQB+rpZBtJvj/C+hD22spus0uD1iG0y/PXyM/lYyv8rO/tDlD+wPADwVMlE86HL4p6x9d3BLQk/yXys5UmY2fHOw/Ti4VW9k0/9M/jkekMlSuyv7UppvD385zb6U5tuDX07zL6X59vCX0/yLdb49+AW7k3142Qii+HlWdxp4t+rr16NB2tpfs5e1ewo/kqV20XI6kNeflPbNRz15h+74y6kGXl+TcgX1DgaVhQKvp9G8uG+ivjfQoRixCDz1yhU06R8OKp3sQwcQRNHQRsGB7LA3stL8u3rOz784L/g4uJXX+67r6J3s+PfDh42/yPP+0cR/rcT+qSERtIMmGo2kMLGyNtuSUL4kTQJngJikFfblbaIwraDAUWE+GmliokJ5q8hI0lyjT46/4PlIo4lRVChv0wqajz45/ua72YcuIIjiJCY6YTg3cv15fdN0cKt+nJYfXyvNSB3DtHFwK6+/lR++ZZ6003yFyaz8BepyqI+hL2mu6aJ+9/bDRLNyBQ0/pjf8+XRRHxI1kez4urTrehylIyCThSOgGEV2rOtyhSxoTbSoVehmH7rgaYJoJ8f5X0IffoY3Gs7eVYLiK13ru3p51pqt0s0D7bH5VHTBta4c36Aub4ZpQFku6zXcFTRMK6haw7+6ch73xkhSrGX1UvKv5KyRVlBcq9DNPnTBo4NoJ8f5X0IfWpr0TxjO7W+bNXr5u8aztwr9rfrerby+FNlqoAWA8/PIINrNcf6X0Ie2XMO5kdEJw7l1cXArz/uq0fxVGjzthRRkgTjYPN3J45lyZFGSVoup5nJnYPUsStJqoWlaoZaBubOoWIuJ5MzAHJmgJMVpBUcW2c0+dMJms7F3d3d2vV7b5hIb+rKSb8PE8WnoW0nWL3zo2lf40PqSlR/a3aeRsZKsTOQ4fmSNZCVjo6P7CjWMrCS7b66bfWjvb2v02bq6EpnPVuZvxwdrK62dfbHJX9bXZyvV60Ym239ocx0LL1D+912/JvK/7cP7Vf5bza/P6v78Gq1dJ/m1eHh/6Vq3++uzvL+bfeiSR2ai3Rznfwl9aMs1nNufyP37Ttdwbv5Uot5W4zxj3a3OTVcAL27cP3XJknGZmyOrefECGRkzUb8w359PdZiosjAmr2GMJv3CGoTeSPO0gsaOCr4x0qhXWFOQTdf4oT66loT7RkYj9QrnlM6m+Ao/Dh3TEN3sQxewOhcN/a73oZc+UagU3N4q9JWuoG0ynHt9kX1+Ubro0qcifddNvmK3YjVdqz9Jj+P6HC/bzdjuvkSlfIWJPfy3cDPeTYHsaoRJbfXqztV7zfIpkJyJZGeuYCJJV3o/y6dxdhUU2dnBn2F1sg9dwHBut/rwGEm0Todgi8Op2bCss4uNpMPEfvg1bcv/y1bPNglvrfIyAHBGHhlEuzXO/xL68Hhp0EvnOr/a0P9s5Qh8D8vqFudMs4BcDJb5/Gj7IA0AP84jg6ixJr+5V7bqTS+/qRtjnOVr2VoWgHxjdgGqtFWCzC4A+cYa33VO1Wyti31wZK6ObLme8dbl2aF068yCj4rWBwNj2u7aRqVgDQDn6dFzop0c538JfWglfdpQ/ttQE71TZKxGveZva5G0mxd1ndvl8BcZbdX3/lEcvq3NnQLAOfE2m43dbre6v7/XxcXFzz4fnJ2NAu+f7MESnsLk+PNr4yBbrVvzUN3Cccyvx5+nCwBngiCKn+ibpoOvuyc5mcidnQLAueInLvg/2w8Je9436eP+JzEEUADPDZkoAAAtkYkCANASQRQAgJYIogAAtEQQBQCgJYIoAAAtEUQBAGiJIAoAL0Ac3MoLNvV9gztV30B8TPpawi+Kn/b0XiyCKAC8SBstJpI//OXAM7pPayvw9s/Irm6Nnpn9QhFEAeAlir9rIun66s0TNPa7xnb/dLH99rbyoozuIYgCwDP00LBrvNhKeqWbBo/TTNvav6FJ2qq/yzTXmp4yHtwxBFEAeGlWdwomUjkYOrZsDvVy+Ocuu0xCT9IrRbts8/ibm7qOIAoAL8xqca+5PIWJe/jVD9+m/+eVg49GEAVw9uLAk+cVtsA1iLnSdFAuN3CNQ8ZBuS0vcA6JNjrmaqpBqa2Bc+iz2fkXK3x5xArZjT6NrCSr5bL62b2W88o86epOg0J2Wh/OTRcOxYErm92/yrCrCKIAzlcWpGovep/0VYpDcSDP69Vu6PPRh0JQy4JsvTH1i401PGYcePJ6I5UPOdfow3T/k5Km51/yTdNACkOroMWq1zjIXm4vKV5W6q+2iuXp6qqw7/IPzY5lq/adZsMs6PqvlbCwqIQgCuBMrTT9kAUpE8lau98iUygXK8iilB8mpXJJuF9Vs5p+yIKsUVRsy0Yypx4zDrLA6CtMim0l2h+y6flXxP/V6Pq1hsNfdD3674nZ6FbLOH3BfWSk+fTf8m9El1vN5emqNseZvuf39J+qvNFwVgiyXbTZbOzd3Z1dr9cWAM5GZNIxSRMdLZaEvpVk/TA51pg1kpWMPdpao2MmNvRlJd8eP2Sz8y/7akP/dtduEt5aP/zqPovw1krrXX8i89nK/F04/tpKt6VzjMxnK/8vWz/trzb0P2fHKv67Sd1uIxMFcJZWyzQHMw/8RmO5nEvyNbw5soR0tUwzOnOjY601O+ZS6SGHOn7IZudfqjP9ptH1L7vVsJc3/5FOzkYz178p9K1Gn7KnGGUrdp/m4QtlrqcldQVBFADOQrogyNwUVsxe/qGx2R6dG11mv/GszbvqjYbjV9LkX01XUvzpu+Z6pbFz6LW+4Gg++rpbQHR8HdQ3LTv8jECCKICzFi+b/NJ/7liJ6mys0XNkGx1zvlSzQzZ7UsFq+q8m/mu9rySu1zevNHdko8tluop2NJLCJJ0Drbm+UGSsRr00yPrhb+5MfLVVLGmy2GeTxYVF42vp6so7cOZpAPav/tOony8Oc6IAzlM+j1mfV0xC3+52JaH1s3LVedHI7OctI5O1VZ0XTULr7xprdsx8HrY+LxpZ44fZvGHD87fWWvu3Nfps3dOnrjnKdF9xjrI2J7o71q2VHpjPjNZpGX22JnLPiebnKOe2Pj7X/IIRRAGcr3xxjmMrBpx9UKtuxSBXCGrVrdhYo2Pmi4sc2y6INj//yBwPRGkgvD26kKkeRLNAq8/WD//aBUBXoE7C2zTIFoLpoQVNKCOIAjhz9eDnXIlbyEhdgWrXmjkS9E48Zj14u1b/Njz/RyoG0V32WQ3MuyBZX7WbB81GmSt2vM1mY7fbre7v73VxcfFkw8QAgP+fOLhVX68Vxt81mr9SZC8Or0Re3WnQSxcaRfa1Ft6/ukrKz8iNA9dipSP810pmfzz5yt9zRxAFgC5bbRR82ur9uHsB8CkQRAEAaImfuAAA0BJBFACAlgiiAAC0RBAFAKAlgigAAC0RRAEAaIkgCgBASwRRAABaIogCANASQRQAgJYIogAAtEQQBQCgJYIoAAAtEUQBAGiJIAoAQEsEUQAAWvofGh+cNeHEjKUAAAAASUVORK5CYII=)

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RcBr} from "../src";

const App = () => {
    return (
        <RcBr
            text={'aaaaaa\nbbbbbbbbb\ncccccc'}
            render={(row) => {
                return <span>{row}</span>
            }}
        />
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
```

