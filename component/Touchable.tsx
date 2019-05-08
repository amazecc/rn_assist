import { PickOptional } from "./type";
import { commonStyle } from "./common";
import * as React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle, TouchableOpacityProps } from "react-native";
import LinearGradient, { LinearGradientProps } from "react-native-linear-gradient";

type LinearGradientPropsNeeds = Pick<LinearGradientProps, "colors" | "start" | "end" | "locations" | "useAngle" | "angleCenter" | "angle">;

interface Props extends Partial<LinearGradientPropsNeeds>, TouchableOpacityProps {}

export class Touchable extends React.PureComponent<Props> {
    public static defaultProps: PickOptional<Props> = {
        activeOpacity: 0.75
    };

    splitStyle = () => {
        const { style } = this.props;
        const outerStyle: StyleProp<ViewStyle> = {};
        const gradientStyle: StyleProp<ViewStyle> = {};
        const borderRadiusStyle: StyleProp<ViewStyle> = {};
        if (style) {
            const flattenedStyle = StyleSheet.flatten(style);
            Object.keys(flattenedStyle).forEach(_ => {
                if (/justifyContent|alignItems|alignContent|flexDirection|flexWrap|(padding*)/.test(_)) {
                    gradientStyle[_] = flattenedStyle[_];
                } else if (/border[a-zA-Z]*Radius/.test(_)) {
                    borderRadiusStyle[_] = flattenedStyle[_];
                } else {
                    outerStyle[_] = flattenedStyle[_];
                }
            });
        }
        return { outerStyle, gradientStyle, borderRadiusStyle };
    };

    renderTouchableOpacity = (children: React.ReactNode, containerStyle: StyleProp<ViewStyle>) => {
        // LinearGradientProps: colors, start, end, locations, useAngle, angleCenter, angle
        // TouchableOpacityProps: style, children, ...resetViewProps
        const { colors, start, end, locations, useAngle, angleCenter, angle, style, children: c, ...resetTouchableOpacityProps } = this.props;
        return (
            <TouchableOpacity {...resetTouchableOpacityProps} style={containerStyle}>
                {children}
            </TouchableOpacity>
        );
    };

    render() {
        const { colors, start, end, locations, useAngle, angleCenter, angle, children, style } = this.props;
        if (colors) {
            const { outerStyle, gradientStyle, borderRadiusStyle } = this.splitStyle();
            const gradientComponent = (
                <LinearGradient
                    pointerEvents="box-none"
                    colors={colors}
                    start={start}
                    end={end}
                    locations={locations}
                    useAngle={useAngle}
                    angleCenter={angleCenter}
                    angle={angle}
                    style={[commonStyle.flex1, borderRadiusStyle, gradientStyle]}
                >
                    {children}
                </LinearGradient>
            );
            return this.renderTouchableOpacity(gradientComponent, [borderRadiusStyle, outerStyle]);
        } else {
            return this.renderTouchableOpacity(children, style);
        }
    }
}
