import * as React from "react";
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, NativeEventSubscription, BackHandler } from "react-native";
import { AnimatedView, AnimatedViewProps } from "./AnimatedView";
import { PickOptional } from "component/type";
import { CloseOverlayProps } from "./register";

export interface OverlayProps extends AnimatedViewProps {
    // private
    onTriggerHide: () => void; // used in OverlayManager
    // default
    children?: React.ReactElement<CloseOverlayProps> | React.ReactText;
    // public
    maskClosable?: boolean;
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
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

    onStartShouldSetResponder = () => true;

    render() {
        const { onTriggerHide, style, contentContainerStyle, maskClosable, children, ...animatedViewProps } = this.props;
        return (
            <AnimatedView {...animatedViewProps} style={styles.overlay}>
                <TouchableOpacity activeOpacity={1} onPress={maskClosable ? onTriggerHide : undefined} style={[styles.mask, style]}>
                    <View onStartShouldSetResponder={this.onStartShouldSetResponder} style={contentContainerStyle}>
                        {React.isValidElement(children) ? React.cloneElement(children, { onTriggerHide }) : children}
                    </View>
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
