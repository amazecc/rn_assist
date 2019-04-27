import * as React from "react";
import { OverlayManager, ToastConfig } from "./overlay/OverlayManager";

export const Toast = {
    push(children: React.ReactNode, props?: ToastConfig) {
        return OverlayManager.pushToast(children, props);
    }
};
