import * as React from "react";
import { StyleSheet, View, StyleProp, ViewStyle, TextInput } from "react-native";
import { InputProps, InputForwardedRef } from "./Input";
import { radius, colors } from "./utils/common";
import { PickOptional } from "./utils/type";

export interface TextareaProps extends InputProps {}

class TextareaBase extends React.PureComponent<TextareaProps & InputForwardedRef> {
    public static defaultProps: PickOptional<InputProps> = {
        editable: true
    };

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
        const { forwardedRef, disabled, editable, style, ...resetInputProps } = this.props;
        const { containerStyle, inputStyle } = this.splitStyle();
        return (
            <View style={[styles.container, disabled && styles.disabledContainer, containerStyle]}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    disableFullscreenUI
                    underlineColorAndroid="transparent"
                    {...resetInputProps}
                    multiline
                    textAlignVertical="top"
                    editable={editable && !disabled}
                    style={[styles.input, disabled && styles.inputDisabled, inputStyle]}
                    ref={forwardedRef}
                />
            </View>
        );
    }
}

export const Textarea = React.forwardRef((props: TextareaProps, ref: React.Ref<TextInput>) => <TextareaBase {...props} forwardedRef={ref} />);

const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: colors.gray,
        padding: 6,
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
    },
    inputDisabled: {
        backgroundColor: colors.grayDisabled
    }
});
