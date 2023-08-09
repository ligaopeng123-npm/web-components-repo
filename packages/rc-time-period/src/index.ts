import CanvasPainter from "zrender/lib/canvas/Painter";
import * as zrender from 'zrender';
import "flatpickr/dist/flatpickr.min.css";

zrender.registerPainter('canvas', CanvasPainter);

export { RcTimePeriod } from "./TimePeriod";

export type { RcTimePeriodRef, RcTimePeriodProps } from "./TimePeriod";