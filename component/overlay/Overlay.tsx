import * as React from "react";
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, NativeEventSubscription, BackHandler } from "react-native";
import { AnimatedView } from "./AnimatedView";
import { PickOptional } from "component/type";
import { commonStyle } from "component/common";

export interface OverlayProps {
    visible: boolean;
    onTriggerHide: () => void;
    onHide: () => void;
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
        const { visible, onHide, onTriggerHide, style, maskClosable, children } = this.props;
        return (
            <AnimatedView visible={visible} onHide={onHide} style={styles.overlay}>
                <TouchableOpacity activeOpacity={1} onPress={maskClosable ? onTriggerHide : undefined} style={[commonStyle.flex1, style]}>
                    {children}
                </TouchableOpacity>
            </AnimatedView>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "#00000080",
        ...StyleSheet.absoluteFillObject
    }
});
