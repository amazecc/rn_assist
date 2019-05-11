import * as React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { PickOptional } from "./utils/type";
import { colors } from "./utils/common";

export interface SpinProps {
    visible?: boolean;
    size?: "small" | "large";
    style?: StyleProp<ViewStyle>;
    color?: string;
}

export class Spin extends React.PureComponent<SpinProps> {
    public static defaultProps: PickOptional<SpinProps> = {
        size: "small",
        color: colors.blue
    };

    render() {
        const { visible, ...restActivityIndicatorProps } = this.props;
        return visible ? <ActivityIndicator {...restActivityIndicatorProps} /> : null;
    }
}
