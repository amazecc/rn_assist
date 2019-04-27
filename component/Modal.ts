import * as React from "react";
import { OverlayManager, ModalConfig } from "./overlay/OverlayManager";

export const Modal = {
    push(children: React.ReactElement, props?: ModalConfig) {
        return OverlayManager.pushModal(children, props);
    },
    pop() {
        OverlayManager.pop();
    }
};
