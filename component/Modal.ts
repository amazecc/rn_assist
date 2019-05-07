import * as React from "react";
import { OverlayManager, OverlayConfig as ModalConfig } from "./overlay/OverlayManager";

export const Modal = {
    push(children: React.ReactElement, props?: ModalConfig) {
        return OverlayManager.pushOverlay(children, props);
    },
    pop() {
        OverlayManager.pop();
    }
};
