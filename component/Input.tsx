import * as React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { radius, colors } from "./utils/common";
import { PickOptional } from "./utils/type";

interface OwnProps {
    disabled?: boolean;
}

export interface InputForwardedRef {
    forwardedRef: React.Ref<TextInput>;
}

export interface InputProps extends OwnProps, TextInputProps {}

class InputBase extends React.PureComponent<InputProps & InputForwardedRef> {
    public static defaultProps: PickOptional<InputProps> = {
        editable: true
    };

    render() {
        const { forwardedRef, disabled, editable, style, ...resetInputProps } = this.props;
        return (
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                disableFullscreenUI
                {...resetInputProps}
                editable={editable && !disabled}
                style={[styles.input, disabled && styles.inputDisabled, style]}
                ref={forwardedRef}
            />
        );
    }
}

export const Input = React.forwardRef((props: InputProps, ref: React.Ref<TextInput>) => <InputBase {...props} forwardedRef={ref} />);

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderRadius: radius.input,
        backgroundColor: colors.gray,
        paddingVertical: 0, // Necessary for Android
        paddingHorizontal: 10
    },
    inputDisabled: {
        backgroundColor: colors.grayDisabled
    }
});
