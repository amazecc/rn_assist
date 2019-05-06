import * as React from "react";
import { OverlayProps, Overlay } from "./Overlay";
import { commonStyle } from "component/common";
import { Toast, ToastProps } from "./Toast";

export type ModalConfig = Pick<OverlayProps, "maskClosable" | "animations" | "duration" | "style" | "contentContainerStyle" | "fadeWithMask">;
export type ToastConfig = Pick<ToastProps, "animations" | "duration" | "style" | "delay" | "textStyle">;

type OverlayType = "overlay" | "toast";

interface Item {
    id: string;
    props: OverlayProps;
    component: React.ComponentType<any>; // Modal
}

interface State {
    overlays: Item[];
    toasts: Item[];
}

let instance: OverlayManager | null = null;

export class OverlayManager extends React.PureComponent<any, State> {
    public static pushModal(children: React.ReactElement, modalConfig?: ModalConfig) {
        const instance = OverlayManager.getInstance();
        const id = instance.createID();
        const newItem = instance.createItem(id, Overlay, {
            ...modalConfig,
            visible: true,
            maskClosable: true,
            style: (modalConfig && modalConfig.style) || commonStyle.center,
            onHide: () => instance.destroy("overlay", id),
            onTriggerHide: () => instance.triggerHideItem("overlay", id),
            children
        });
        instance.setState(prevState => ({
            overlays: [...prevState.overlays, newItem]
        }));
    }

    public static pushToast(children: React.ReactElement | React.ReactText, toastConfig?: ToastConfig) {
        const instance = OverlayManager.getInstance();
        const id = instance.createID();
        const newItem = instance.createItem(id, Toast, {
            ...toastConfig,
            visible: true,
            maskClosable: false,
            onHide: () => instance.destroy("toast", id),
            onTriggerHide: () => instance.triggerHideItem("toast", id),
            children
        });
        instance.setState(prevState => ({
            toasts: [...prevState.toasts, newItem]
        }));
    }

    public static pop() {
        const instance = OverlayManager.getInstance();
        const lastModal = instance.state.overlays[instance.state.overlays.length - 1];
        if (lastModal) {
            lastModal.props.onTriggerHide();
        }
    }

    private static getInstance() {
        if (instance === null) {
            throw Error("component OverlayManager has not been mounted");
        }
        return instance;
    }

    constructor(props: any) {
        super(props);
        this.state = {
            overlays: [],
            toasts: []
        };
    }

    componentDidMount() {
        instance = this;
    }

    componentWillUnmount() {
        instance = null;
    }

    createItem<T extends OverlayProps>(id: string, component: React.ComponentType<T>, props: T): Item {
        return {
            id,
            props,
            component
        };
    }

    destroy(type: OverlayType, id: string) {
        const { overlays, toasts } = this.state;
        const items = type === "toast" ? toasts : overlays;
        const index = items.findIndex(_ => _.id === id);
        if (index > -1) {
            const newItems = [...items];
            newItems.splice(index, 1);
            this.setState({
                toasts: type === "toast" ? newItems : toasts,
                overlays: type === "overlay" ? newItems : overlays
            });
        }
    }

    triggerHideItem(type: OverlayType, id: string) {
        const { overlays, toasts } = this.state;
        const items = type === "toast" ? toasts : overlays;
        const newItems = items.map(_ => (_.id === id ? { ..._, props: { ..._.props, visible: false } } : _));
        this.setState({
            overlays: type === "overlay" ? newItems : overlays,
            toasts: type === "toast" ? newItems : toasts
        });
    }

    createID() {
        return Date.now().toString(16);
    }

    render() {
        const { overlays, toasts } = this.state;
        const currentToast = toasts[0];
        return (
            <React.Fragment>
                {overlays.map(_ => (
                    <_.component key={_.id} {..._.props} />
                ))}
                {currentToast && <currentToast.component key={currentToast.id} {...currentToast.props} />}
            </React.Fragment>
        );
    }
}
