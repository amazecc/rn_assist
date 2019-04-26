import * as React from "react";
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, NativeEventSubscription, BackHandler } from "react-native";
import { AnimatedView } from "./AnimatedView";
import { PickOptional } from "component/type";
import { commonStyle } from "component/common";

export interface OverlayProps {
    visible: boolean;
    onClose: () => void;
    maskClosable?: boolean;
    style?: StyleProp<ViewStyle>;
}

interface Props extends OverlayProps {}

export class Overlay extends React.PureComponent<Props> {
    public static defaultProps: PickOptional<Props> = {
        maskClosable: true
    };

    private backHandler: NativeEventSubscription | null = null;

    componentDidMount() {
        if (this.props.maskClosable) {
            this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
                this.props.onClose();
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
        const { visible, onClose, style, maskClosable, children } = this.props;
        return (
            <AnimatedView visible={visible} onHide={onClose} style={styles.overlay}>
                <TouchableOpacity activeOpacity={1} onPress={maskClosable ? onClose : undefined} style={[commonStyle.flex1, style]}>
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
