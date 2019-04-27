import * as React from "react";
import { StyleSheet, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Overlay, OverlayProps } from "./Overlay";
import { Omit, PickOptional } from "component/type";
import { commonStyle } from "component/common";

export interface ToastProps extends Omit<OverlayProps, "style"> {
    delay?: number;
    containerStyle?: StyleProp<ViewStyle>;
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
        const { children, delay, containerStyle, textStyle, ...overProps } = this.props;
        const isTextType = typeof children === "string" || typeof children === "number";
        return (
            <Overlay {...overProps} style={[styles.container, containerStyle]}>
                {isTextType ? <Text style={[styles.text, textStyle]}>{children}</Text> : children}
            </Overlay>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        minWidth: 80,
        maxWidth: 300,
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignSelf: "center",
        top: "80%",
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        ...commonStyle.shadow
    },
    text: {
        textAlign: "center",
        color: "#ffffff"
    }
});
