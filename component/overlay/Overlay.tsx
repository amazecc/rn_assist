import * as React from "react";
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, NativeEventSubscription, BackHandler } from "react-native";
import { AnimatedView, AnimatedViewProps } from "./AnimatedView";
import { PickOptional } from "component/utils/type";

export interface OverlayProps extends AnimatedViewProps {
    // private
    onTriggerHide: () => void; // used in OverlayManager
    // default
    children?: React.ReactElement | React.ReactText;
    // public
    fadeWithMask?: boolean;
    maskClosable?: boolean;
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export class Overlay extends React.PureComponent<OverlayProps> {
    public static defaultProps: PickOptional<OverlayProps> = {
        maskClosable: true,
        fadeWithMask: true
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

    onStartShouldSetResponder = () => true;

    render() {
        const { onTriggerHide, style, contentContainerStyle, maskClosable, fadeWithMask, children, ...animatedViewProps } = this.props;
        const content = (
            <View onStartShouldSetResponder={this.onStartShouldSetResponder} style={contentContainerStyle}>
                {children}
            </View>
        );
        return (
            <React.Fragment>
                <AnimatedView {...animatedViewProps} style={StyleSheet.absoluteFillObject}>
                    <TouchableOpacity activeOpacity={1} onPress={maskClosable ? onTriggerHide : undefined} style={[styles.mask, style]}>
                        {fadeWithMask && content}
                    </TouchableOpacity>
                </AnimatedView>
                {!fadeWithMask && (
                    <View pointerEvents="box-none" style={[StyleSheet.absoluteFill, style]}>
                        {content}
                    </View>
                )}
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    mask: {
        flex: 1,
        backgroundColor: "#00000080"
    }
});
