import * as React from "react";
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, NativeEventSubscription, BackHandler, TouchableWithoutFeedback, Alert } from "react-native";
import { AnimatedView, AnimatedViewProps } from "./AnimatedView";
import { PickOptional } from "component/type";
import { CloseOverlayProps } from "./register";

export interface OverlayProps extends AnimatedViewProps {
    onTriggerHide: () => void;
    maskClosable?: boolean;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactElement<CloseOverlayProps> | React.ReactText;
}

export class Overlay extends React.PureComponent<OverlayProps> {
    public static defaultProps: PickOptional<OverlayProps> = {
        maskClosable: true
    };

    private backHandler: NativeEventSubscription | null = null;

    componentDidMount() {
        if (this.props.maskClosable) {
            this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
                this.props.onTriggerHide();
                return true;
            });
        }
    }

    componentWillUnmount() {
        if (this.props.maskClosable) {
            this.backHandler!.remove();
        }
    }

    render() {
        const { onTriggerHide, style, maskClosable, children, ...animatedViewProps } = this.props;
        return (
            <AnimatedView {...animatedViewProps} style={styles.overlay}>
                <TouchableOpacity activeOpacity={1} onPress={maskClosable ? onTriggerHide : undefined} style={[styles.mask, style]}>
                    <TouchableWithoutFeedback>{React.isValidElement(children) ? React.cloneElement(children, { onTriggerHide }) : children}</TouchableWithoutFeedback>
                </TouchableOpacity>
            </AnimatedView>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        ...StyleSheet.absoluteFillObject
    },
    mask: {
        flex: 1,
        backgroundColor: "#00000080"
    }
});
