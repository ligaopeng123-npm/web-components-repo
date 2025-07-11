import * as THREE from 'three';
import ThreeBase from './ThreeBase.js';
import { getBasicMaterial, getDrawColors, getTextArraySprite } from './util.js';

export default class ThreeRing extends ThreeBase {
    constructor() {
        super();
        this.isStats = false;
        this.isAxis = false;
        this.rotateAngle = 0;
        this.count = 0;
        this.time = 0;
        this.currentTextMesh = null;
    }

    createChart(that) {
        this.that = that;
        if (this.group) {
            this.cleanObj(this.group);
            this.group = null;
        }
        if (that.data.length == 0) {
            return;
        }
        this.cLen = 3;
        //获取渐变色
        this.colors = getDrawColors(that.colors, this.cLen);
        //从小到大排序
        that.data = that.data.sort((a, b) => a.value - b.value);
        let { baseHeight, radius, perHeight, maxHeight, fontColor, fontSize } = that;

        let sum = 0;
        let min = Number.MAX_SAFE_INTEGER;
        let max = 0;
        for (let i = 0; i < that.data.length; i++) {
            let item = that.data[i];
            sum += item.value;
            if (min > item.value) {
                min = item.value;
            }
            if (max < item.value) {
                max = item.value;
            }
        }

        let startRadius = 0;
        let valLen = max - min;
        let allHeight = maxHeight - baseHeight;
        let axis = new THREE.Vector3(1, 0, 0);
        let group = new THREE.Group();
        this.group = group;
        this.scene.add(group);

        for (let idx = 0; idx < that.data.length; idx++) {
            let objGroup = new THREE.Group();
            objGroup.name = 'group' + idx;
            let item = that.data[idx];
            //角度范围
            let angel = (item.value / sum) * Math.PI * 2;
            //高度与值的映射
            let h = baseHeight + ((item.value - min) / valLen) * allHeight;
            //每个3D组成块组成：扇形柱体加两片矩形面
            if (item.value) {
                //创建渐变色材质组
                const cs = this.colors[idx % this.colors.length];
                // 圆柱形几何体
                const geometry = new THREE.CylinderGeometry(
                    radius,
                    radius,
                    h,
                    24,
                    24,
                    false,
                    startRadius, //开始角度
                    angel //扇形角度占有范围
                );

                let ms = [];
                for (let k = 0; k < this.cLen - 1; k++) {
                    ms.push(getBasicMaterial(THREE, cs[k]));
                }

                //给不同面的设定对应的材质索引
                geometry.faces?.forEach((f, fIdx) => {
                    if (f.normal.y == 0) {
                        //上面和底面
                        geometry.faces[fIdx].materialIndex = 0;
                    } else {
                        //侧面
                        geometry.faces[fIdx].materialIndex = 1;
                    }
                });
                //扇形圆柱
                let mesh = new THREE.Mesh(geometry, ms);
                mesh.position.y = h * 0.5;
                mesh.name = 'p' + idx;
                objGroup.add(mesh);

                const g = new THREE.PlaneGeometry(radius, h);
                let m = getBasicMaterial(THREE, cs[this.cLen - 1]);

                //注意图形开始角度和常用的旋转角度差90度

                //封口矩形1
                let r1 = startRadius + Math.PI * 0.5;
                const plane = new THREE.Mesh(g, m);
                plane.position.y = h * 0.5;
                plane.position.x = 0;
                plane.position.z = 0;
                plane.name = 'c' + idx;
                plane.rotation.y = r1;
                plane.translateOnAxis(axis, -radius * 0.5);
                objGroup.add(plane);
                //封口矩形2
                let r2 = startRadius + angel + Math.PI * 0.5;
                const plane1 = new THREE.Mesh(g, m);
                plane1.position.y = h * 0.5;
                plane1.position.x = 0;
                plane1.position.z = 0;
                plane1.name = 'b' + idx;
                plane1.rotation.y = r2;
                plane1.translateOnAxis(axis, -radius * 0.5);
                objGroup.add(plane1);

                //显示label
                if (that.isLabel) {
                    let textList = [
                        { text: item.name, color: fontColor },
                        { text: item.value + that.suffix, color: fontColor }
                    ];

                    const { mesh: textMesh } = getTextArraySprite(THREE, textList, fontSize);
                    textMesh.name = 'f' + idx;
                    //y轴位置
                    textMesh.position.y = maxHeight + baseHeight;
                    //x,y轴位置
                    let r = startRadius + angel * 0.5 + Math.PI * 0.5;
                    textMesh.position.x = -Math.cos(r) * radius;
                    textMesh.position.z = Math.sin(r) * radius;
                    if (this.that.isAnimate) {
                        if (idx == 0) {
                            textMesh.visible = true;
                        } else {
                            textMesh.visible = false;
                        }
                    }

                    objGroup.add(textMesh);
                }
                group.add(objGroup);
            }
            startRadius = angel + startRadius;
        }
        //图形居中，视角设置
        this.setModelCenter(group, that.viewControl);
    }
    animateAction() {
        if (this.that?.isAnimate && this.group) {
            this.time++;
            this.rotateAngle += 0.01;
            //物体自旋转
            this.group.rotation.y = this.rotateAngle;
            //标签显隐切换
            if (this.time > 90) {
                if (this.currentTextMesh) {
                    this.currentTextMesh.visible = false;
                }
                let textMesh = this.scene.getObjectByName('f' + (this.count % this.that.data.length));
                textMesh.visible = true;
                this.currentTextMesh = textMesh;
                this.count++;
                this.time = 0;
            }
            if (this.rotateAngle > Math.PI * 2) {
                this.rotateAngle = 0;
            }
        }
    }
}
