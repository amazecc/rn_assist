import { Omit } from "../type";

export interface CloseOverlayProps {
    onTriggerHide: () => void;
}

// TODO: register return type
export function registerOverlayTypeComponent<T extends CloseOverlayProps>(component: React.ComponentType<T>): React.ComponentType<Omit<T, "onTriggerHide">> {
    return component as any;
}
