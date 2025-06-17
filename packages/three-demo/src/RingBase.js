import { isElement, toFixed } from "@gaopeng123/utils";

function drawPie(canvas, sourceData) {
    const data = sourceData.map(item => item.value);
    const ctx = canvas.getContext('2d');
    const colorList = ['#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'],
        radius = 100,
        innerRadius = 50;
    ctx.save();
    const position = [600, 400],
        positionRing = [600, 340],
        positionY = position[1] - positionRing[1],
        deg = Math.PI,
        opacity = 0.6,
        origin = 0;
    let rankData = data.concat().sort(function (a, b) {
        return a - b
    }), point = [], op = [], rank = [], rankFace = [], order = [], rec, mark = [], rate = [];
    // 绘制扇形
    CanvasRenderingContext2D.prototype.sector = function (radius, sAngle, eAngle, _origin, last, i) {
        const origin = (last ? -rank[i] * 20 : 0);
        const startAngle = 2 * (sAngle + origin) * deg;
        const endAngle = 2 * (eAngle + origin) * deg;
        this.beginPath();
        this.moveTo(0, origin);
        this.arc(0, origin, radius, startAngle, endAngle); // 顺时针

        // this.lineTo(0 + innerRadius * Math.cos(endAngle), origin + innerRadius * Math.sin(endAngle)); // 连接到内圈起点
        // this.arc(0, origin, innerRadius, endAngle, startAngle, true); // 绘制内圈弧（顺时针）
        // this.lineTo(0, origin); // 连接到圆心
        this.closePath();
        this.fillStyle = colorList[i];
        this.fill();
        return this;
    };

    /*
    *  扇形底座
    */
    function drawData(data, radius, origin, last) {
        ctx.save();
        let clonerankData = rankData.concat();
        point = [];
        op = [];
        rate = [];
        ctx.translate(position[0], position[1]);
        let start = 0, end = 0, sum = 0, l = data.length;
        order = new Array(l);
        for (let i = 0; i < l; i++) {
            sum += Number(data[i]);
        }
        ctx.scale(2, 1);
        for (let i = 0; i < l; i++) {
            start = end;
            end += Number(data[i]) / sum;
            rate.push(Number(data[i]) / sum);
            if (start < 0.5 && end > 0.5) {
                point.push([start, 0.5, [radius * Math.cos(2 * deg * (start)), radius * Math.sin(2 * deg * (start))], [radius * Math.cos(2 * deg * (0.5)), radius * Math.sin(2 * deg * (0.5))]]);
                point.push([0.5, end, [radius * Math.cos(2 * deg * (0.5)), radius * Math.sin(2 * deg * (0.5))], [radius * Math.cos(2 * deg * (end)), radius * Math.sin(2 * deg * (end))]]);
                rec = i;
            } else if (end == 0.5) {
                point.push([start, 0.5, [radius * Math.cos(2 * deg * (start)), radius * Math.sin(2 * deg * (start))], [radius * Math.cos(2 * deg * (0.5)), radius * Math.sin(2 * deg * (0.5))]]);
                point.push([0.5, 0.5, [radius * Math.cos(2 * deg * (0.5)), radius * Math.sin(2 * deg * (0.5))], [radius * Math.cos(2 * deg * (0.5)), radius * Math.sin(2 * deg * (0.5))]]);
                rec = i;
            } else {
                point.push([start, end, [radius * Math.cos(2 * deg * (start)), radius * Math.sin(2 * deg * (start))], [radius * Math.cos(2 * deg * (end)), radius * Math.sin(2 * deg * (end))]]);
            }
            op.push([start, end, [radius * Math.cos(2 * deg * (start)), radius * Math.sin(2 * deg * (start))], [radius * Math.cos(2 * deg * (end)), radius * Math.sin(2 * deg * (end))]]);
            let n = clonerankData.indexOf(data[i]);
            order[n] = [start, end, i];
            clonerankData[n] = '';
            ctx.sector(radius, start, end, origin, last, i);
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
        ctx.restore();
    }

    function drawDataTop(data, radius, origin, last, pos) {
        ctx.save();
        ctx.translate(positionRing[0], positionRing[1]);
        ctx.scale(2, 1);
        let l = order.length;
        for (let i = 0; i < l; i++) {
            if ((pos && order[i][0] < 0.5) || (!pos && order[i][0] >= 0.5)) {
                ctx.sector(radius, order[i][0], order[i][1], origin, last, order[i][2]);
                ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            if (pos) {
                mark.push([0.5 * (order[i][0] + order[i][1]),
                    [(radius - 10) * Math.cos(2 * deg * (0.5 * (order[i][0] + order[i][1]))), (radius - 10) * Math.sin(2 * deg * (0.5 * (order[i][0] + order[i][1]))) - rank[order[i][2]] * 20],
                    [(radius + 30) * Math.cos(2 * deg * (0.5 * (order[i][0] + order[i][1]))), (radius + 30) * Math.sin(2 * deg * (0.5 * (order[i][0] + order[i][1]))) - rank[order[i][2]] * 20]]);
            }
        }
        ctx.restore();
    }

    // 绘制图例
    function drawMark(mark) {
        let l = mark.length;
        ctx.save();
        ctx.translate(positionRing[0], positionRing[1]);
        ctx.scale(2, 1);
        for (let i = 0; i < l; i++) {
            ctx.beginPath();
            ctx.setLineDash([2, 2]);
            ctx.moveTo(mark[i][1][0], mark[i][1][1]);
            ctx.lineTo(mark[i][2][0], mark[i][2][1]);
            ctx.textBaseline = "bottom";
            ctx.fillStyle = '#fff'; // colorList[i]
            ctx.globalAlpha = 1;
            ctx.font = "20px Arial";
            const txt = `${sourceData[i].name}  ${data[i]} ${toFixed(rate[i] * 100, 2)}`;
            const tw = ctx.measureText(txt).width;
            if (mark[i][0] <= 0.25 || mark[i][0] >= 0.75) {
                ctx.lineTo(mark[i][2][0] + 80, mark[i][2][1]);
                ctx.save();
                ctx.scale(0.5, 1);
                ctx.fillText(txt, (mark[i][2][0] + 80) * 2 - tw, mark[i][2][1] - 10);
                ctx.restore();
            } else {
                ctx.lineTo(mark[i][2][0] - 80, mark[i][2][1]);
                ctx.save();
                ctx.scale(0.5, 1);
                ctx.fillText(txt, (mark[i][2][0] - 80) * 2, mark[i][2][1] - 10);
                ctx.restore();
            }
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#000';
            ctx.stroke();
            ctx.closePath();
        }
        ctx.restore();
    }

    /**
     * 绘制差距数据
     */
    function drawRantData(isTop) {
        ctx.save();
        ctx.translate(position[0], position[1]);
        ctx.scale(2, 1);
        let l = op.length;
        if (isTop) {
            for (let i = 0; i < l; i++) {
                let a = i, b = i + 1 < l ? i + 1 : 0, c = i >= 1 ? i - 1 : l - 1;
                if (rank[b] > rank[a] && op[a][1] >= 0.5 && op[a][1] < 0.75) {
                    ctx.beginPath();
                    ctx.moveTo(0, -positionY - rank[a] * 20);
                    ctx.lineTo(op[a][3][0], op[a][3][1] - positionY - rank[a] * 20);
                    ctx.lineTo(op[b][2][0], op[b][2][1] - positionY - rank[b] * 20);
                    ctx.lineTo(0, -positionY - rank[b] * 20);
                    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.lineTo(0, -positionY - rank[a] * 20);
                    ctx.fillStyle = colorList[b];
                    ctx.fill();
                    ctx.closePath();
                    if (op[b][1] - op[b][0] != 0.5 && rank[b] == data.length - 1) {
                        let f = b + 1 < l ? b + 1 : 0;
                        f = rank[a] > rank[f] ? a : f;
                        ctx.beginPath();
                        ctx.moveTo(0, -positionY - rank[b] * 20);
                        ctx.lineTo(0, -positionY - rank[f] * 20);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
                if (rank[c] > rank[a] && op[a][0] > 0.75) {
                    ctx.beginPath();
                    ctx.moveTo(0, -positionY - rank[c] * 20);
                    ctx.lineTo(op[c][3][0], op[c][3][1] - positionY - rank[c] * 20);
                    ctx.lineTo(op[a][2][0], op[a][2][1] - positionY - rank[a] * 20);
                    ctx.lineTo(0, -positionY - rank[a] * 20);
                    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.lineTo(0, -positionY - rank[c] * 20);
                    ctx.fillStyle = colorList[c];
                    ctx.fill();
                    ctx.closePath();
                    if (op[b][1] - op[b][0] != 0.5 && rank[b] == data.length - 1) {
                        let f = b + 1 < l ? b + 1 : 0;
                        f = rank[a] > rank[f] ? a : f;
                        ctx.beginPath();
                        ctx.moveTo(0, -positionY - rank[b] * 20);
                        ctx.lineTo(0, -positionY - rank[f] * 20);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        } else {
            for (let i = 0; i < l; i++) {
                let a = i, b = i + 1 < l ? i + 1 : 0, c = i >= 1 ? i - 1 : l - 1;
                if (rank[b] > rank[a] && op[a][1] > 0.25 && op[a][1] < 0.5) {
                    ctx.beginPath();
                    ctx.moveTo(0, -positionY - rank[a] * 20);
                    ctx.lineTo(op[a][3][0], op[a][3][1] - positionY - rank[a] * 20);
                    ctx.lineTo(op[b][2][0], op[b][2][1] - positionY - rank[b] * 20);
                    ctx.lineTo(0, -positionY - rank[b] * 20);
                    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.lineTo(0, -positionY - rank[a] * 20);
                    ctx.fillStyle = colorList[b];
                    ctx.fill();
                    ctx.closePath();
                    if (op[b][1] - op[b][0] != 0.5 && rank[b] == data.length - 1) {
                        let f = b + 1 < l ? b + 1 : 0;
                        f = rank[a] > rank[f] ? a : f;
                        ctx.beginPath();
                        ctx.moveTo(0, -positionY - rank[b] * 20);
                        ctx.lineTo(0, -positionY - rank[f] * 20);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
                if (rank[c] > rank[a] && op[a][0] < 0.25) {
                    ctx.beginPath();
                    ctx.moveTo(0, -positionY - rank[c] * 20);
                    ctx.lineTo(op[c][3][0], op[c][3][1] - positionY - rank[c] * 20);
                    ctx.lineTo(op[c][3][0], op[c][3][1] - positionY - rank[c] * 20);
                    ctx.lineTo(op[a][2][0], op[a][2][1] - positionY - rank[a] * 20);
                    ctx.lineTo(0, -positionY - rank[a] * 20);
                    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.lineTo(0, -positionY - rank[c] * 20);
                    ctx.fillStyle = colorList[c];
                    ctx.fill();
                    ctx.closePath();
                    if (op[b][1] - op[b][0] != 0.5 && rank[b] == data.length - 1) {
                        let f = b + 1 < l ? b + 1 : 0;
                        f = rank[a] > rank[f] ? a : f;
                        ctx.beginPath();
                        ctx.moveTo(0, -positionY - rank[b] * 20);
                        ctx.lineTo(0, -positionY - rank[f] * 20);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }
        ctx.restore();
    }

    /**
     * 连接扇形的线
     * @param arr
     * @param c
     */
    function faces(arr, c, i) {
        ctx.save();
        ctx.translate(position[0], position[1]);
        ctx.scale(2, 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 2 * (arr[0] + origin) * deg, 2 * (arr[1] + origin) * deg, false);
        ctx.moveTo(arr[2][0], arr[2][1]);
        ctx.arc(0, -positionY - rankFace[i] * 20, radius, 2 * (arr[0] + origin) * deg, 2 * (arr[1] + origin) * deg, false);
        ctx.lineTo(arr[3][0], arr[3][1]);
        ctx.globalAlpha = opacity; // 透明度
        ctx.fillStyle = c;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    function drawInnerPie() {
        // ctx.save();
        // ctx.translate(position[0], position[1]);
        // ctx.scale(2, 1);
        // ctx.beginPath();
        // ctx.arc(0, 0, innerRadius, 0, 2 * Math.PI, false);
        // ctx.fillStyle = '#072747';
        // ctx.fill()
        // ctx.restore();
    }

    drawData(data, radius, origin);
    rank = [];
    rankFace = [];
    rankData = data.concat().sort(function (a, b) {
        return a - b
    });
    for (let i = 0; i < data.length; i++) {
        rank.push(rankData.indexOf(data[i]));
        rankFace.push(rankData.indexOf(data[i]));
        if (point[i][1] == 0.5) {
            rankFace.push(rankData.indexOf(data[i]));
        }
    }
    drawRantData(true);
    drawDataTop(data, radius, 0, true, false);
    drawRantData();
    drawDataTop(data, radius, 0, true, true);
    for (let i = rec; i >= 0; i--) {
        faces(point[i], colorList[i], i);
    }
    drawMark(mark);
    ctx.restore();
}

// document.getElementById('myForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // 阻止默认的表单提交行为
//     sumbit();
// });

// function sumbit() {
//     data = document.getElementById('data').value.split(',');
//     drawPie(data.sort(function (a, b) {
//         return a - b
//     }), colorList, radius);
// }
// drawPie([10, 16, 20, 25], colorList, radius);

export default class RingPie {
    canvas = null;

    constructor() {

    }

    init(el) {
        if (!isElement(el)) {
            return console.error('Element is not valid');
        }
        const canvas = document.createElement('canvas');
        canvas.width = el.offsetWidth;
        canvas.height = el.offsetHeight;
        this.canvas = canvas;
        el.appendChild(canvas);
    }

    create({
               data,
               colors,
           }) {
        if (isElement(this.canvas)) {
            drawPie(this.canvas, data, colors);
        }
    }
}