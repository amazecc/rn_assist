import * as React from "react";
import { Modal, ModalProps } from "./Modal";
import { OverlayProps } from "./Overlay";
import { Omit } from "component/type";

type OverlayConfig = Omit<OverlayProps, "style" | "maskClosable">;
type ModalConfig = Omit<ModalProps, "style" | "maskClosable">;

type OverlayType = "modal" | "toast";

interface Item {
    id: string;
    children: React.ReactNode;
    props: OverlayProps;
    component: React.ComponentType<any>; // Modal
}

interface State {
    modals: Item[];
    toasts: Item[];
}

let instance: OverlayManager | null = null;

export class OverlayManager extends React.PureComponent<any, State> {
    public static pushModal(children: React.ReactElement, props?: ModalConfig) {
        const instance = OverlayManager.getInstance();
        const newItem = instance.createItem(Modal, children, props);
        instance.setState(prevState => ({
            modals: [...prevState.modals, newItem]
        }));

        return {
            destroy: newItem.props.onTriggerHide
        };
    }

    public static pop() {
        const instance = OverlayManager.getInstance();
        const lastModal = instance.state.modals[instance.state.modals.length - 1];
        if (lastModal) {
            lastModal.props.onTriggerHide();
        }
    }

    private static getInstance() {
        if (instance === null) {
            throw Error("RootView has not been mounted");
        }
        return instance;
    }

    constructor(props: any) {
        super(props);
        this.state = {
            modals: [],
            toasts: []
        };
    }

    componentDidMount() {
        instance = this;
    }

    componentWillUnmount() {
        instance = null;
    }

    createItem<T>(component: React.ComponentType<T>, children: React.ReactNode, props?: T): Item {
        const id = Date.now().toString();
        return {
            id,
            children,
            props: {
                ...props,
                visible: true,
                onHide: () => OverlayManager.getInstance().destroy("modal", id),
                onTriggerHide: () => OverlayManager.getInstance().triggerHideModal("modal", id)
            },
            component
        };
    }

    destroy(type: OverlayType, id: string) {
        const { modals, toasts } = this.state;
        const items = type === "toast" ? toasts : modals;
        const index = items.findIndex(_ => _.id === id);
        if (index > -1) {
            const newItems = [...items];
            newItems.splice(index, 1);
            this.setState({
                toasts: type === "toast" ? newItems : toasts,
                modals: type === "modal" ? newItems : modals
            });
        }
    }

    triggerHideModal(type: OverlayType, id: string) {
        const { modals, toasts } = this.state;
        const items = type === "toast" ? toasts : modals;
        const newItems = items.map(_ => (_.id === id ? { ..._, props: { ..._.props, visible: false } } : _));
        this.setState({
            toasts: type === "toast" ? newItems : toasts,
            modals: type === "modal" ? newItems : modals
        });
    }

    render() {
        const { modals, toasts } = this.state;
        return (
            <React.Fragment>
                {modals.map(_ => (
                    <_.component key={_.id} {..._.props} children={_.children} />
                ))}
                {toasts.map(_ => (
                    <_.component key={_.id} {..._.props} children={_.children} />
                ))}
            </React.Fragment>
        );
    }
}
