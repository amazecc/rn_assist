import * as React from "react";
import { StyleProp, StyleSheet, TextStyle, Text } from "react-native";
import { Touchable, TouchableProps } from "./Touchable";
import { colors, radius } from "./utils/common";

export interface ButtonProps extends TouchableProps {
    text?: string | React.ReactElement;
    textStyle?: StyleProp<TextStyle>;
}

export class Button extends React.PureComponent<ButtonProps> {
    render() {
        const { text, textStyle, children, style, ...touchableProps } = this.props;
        return (
            <Touchable {...touchableProps} style={[styles.container, style]}>
                {typeof text === "string" ? <Text style={[styles.text, textStyle]}>{text}</Text> : text}
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 180,
        height: 40,
        borderRadius: radius.main,
        backgroundColor: colors.blue,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: colors.white
    }
});
