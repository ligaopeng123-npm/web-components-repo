import  CanvasPainter  from "zrender/lib/canvas/Painter";
import * as zrender from 'zrender';

zrender.registerPainter('canvas', CanvasPainter);

export { default as TimePeriodCharts } from "./TimePeriodCharts";