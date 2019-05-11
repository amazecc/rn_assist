import * as React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { Input, InputProps } from "./Input";
import { radius, colors } from "./utils/common";

export interface TextareaProps extends InputProps {}

export class Textarea extends React.PureComponent<TextareaProps> {
    splitStyle() {
        const { style } = this.props;
        const containerStyle: StyleProp<ViewStyle> = {};
        const inputStyle: StyleProp<ViewStyle> = {};
        if (style) {
            const flattenedStyle = StyleSheet.flatten(style);
            Object.keys(flattenedStyle).forEach(_ => {
                if (/margin|padding|border|background|width|height/.test(_)) {
                    containerStyle[_] = flattenedStyle[_];
                } else {
                    inputStyle[_] = flattenedStyle[_];
                }
            });
        }
        return { containerStyle, inputStyle };
    }

    render() {
        const { disabled, style, ...resetInputProps } = this.props;
        const { containerStyle, inputStyle } = this.splitStyle();
        return (
            <View style={[styles.container, disabled && styles.disabledContainer, containerStyle]}>
                <Input {...resetInputProps} multiline textAlignVertical="top" disabled={disabled} style={[styles.input, inputStyle]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: colors.gray,
        paddingHorizontal: 6,
        paddingVertical: 6,
        borderRadius: radius.input,
        overflow: "hidden"
    },
    disabledContainer: {
        backgroundColor: colors.grayDisabled
    },
    input: {
        flex: 1,
        height: undefined,
        width: undefined,
        paddingHorizontal: 0,
        backgroundColor: "transparent",
        borderRadius: 0
    }
});
