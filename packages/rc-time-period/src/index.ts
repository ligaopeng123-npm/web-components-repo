import CanvasPainter from "zrender/lib/canvas/Painter";
import * as zrender from 'zrender';

zrender.registerPainter('canvas', CanvasPainter);

export { default as RcTimePeriod } from "./TimePeriod";

export type { RcTimePeriodRef, RcTimePeriodProps } from "./TimePeriod";

export { PositioningModal } from "./components/PositioningModal";

export { default as PeriodTip } from "./components/PeriodTip";