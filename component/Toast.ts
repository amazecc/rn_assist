import * as React from "react";
import { OverlayManager, ToastConfig } from "./overlay/OverlayManager";

export function toast(children: React.ReactElement | React.ReactText, props?: ToastConfig) {
    return OverlayManager.pushToast(children, props);
}
