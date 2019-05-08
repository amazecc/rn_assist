import * as React from "react";
import { StyleSheet, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Overlay, OverlayProps } from "./Overlay";
import { PickOptional } from "component/type";
import { commonStyle, radius } from "component/common";

export interface ToastProps extends OverlayProps {
    // default
    children?: React.ReactElement | React.ReactText;
    // public
    delay?: number;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export class Toast extends React.PureComponent<ToastProps> {
    public static defaultProps: PickOptional<ToastProps> = {
        delay: 2000
    };

    private timer: NodeJS.Timeout | undefined;

    componentDidMount() {
        const { delay, onTriggerHide } = this.props;
        this.timer = setTimeout(onTriggerHide, delay!);
    }

    componentWillMount() {
        clearTimeout(this.timer!);
    }

    render() {
        const { children, delay, style, textStyle, ...overProps } = this.props;
        return (
            <Overlay {...overProps} style={[styles.container, style]}>
                {React.isValidElement(children) ? children : <Text style={[styles.text, textStyle]}>{children}</Text>}
            </Overlay>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: undefined,
        position: "absolute",
        minHeight: 28,
        minWidth: 80,
        alignSelf: "center",
        bottom: "20%",
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        ...commonStyle.shadow
    },
    text: {
        textAlign: "center",
        color: "#ffffff"
    }
});
