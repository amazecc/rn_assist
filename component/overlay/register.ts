import * as React from "react";

import { Omit } from "../type";

export interface CloseOverlayProps {
    onTriggerHide: () => void;
}

// TODO: register return type
export function registerOverlayTypeComponent<T extends CloseOverlayProps>(C: React.ComponentType<T>): React.ComponentType<Omit<T, "onTriggerHide">> {
    return C as any;
}
