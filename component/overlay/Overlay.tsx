import * as React from "react";
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, NativeEventSubscription, BackHandler, TouchableWithoutFeedback } from "react-native";
import { AnimatedView, AnimatedViewProps } from "./AnimatedView";
import { PickOptional } from "component/type";
import { commonStyle } from "component/common";

export interface OverlayProps extends AnimatedViewProps {
    onTriggerHide: () => void;
    maskClosable?: boolean;
    style?: StyleProp<ViewStyle>;
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
                <TouchableOpacity activeOpacity={1} onPress={maskClosable ? onTriggerHide : undefined} style={[commonStyle.mask, style]}>
                    <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
                </TouchableOpacity>
            </AnimatedView>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        ...StyleSheet.absoluteFillObject
    }
});
