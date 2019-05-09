import * as React from "react";
import { Animated, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Touchable } from "./Touchable";
import { PickOptional } from "./type";

// TODO: 添加记忆函数优化样式

interface ColorsMap {
    uncheckedDisabled?: string;
    unchecked?: string;
    checkedDisabled?: string;
    checked?: string;
}

export interface SwitchProps {
    checked?: boolean;
    onChange?: (isChecked: boolean) => void;
    containerStyle?: StyleProp<ViewStyle>; // TODO
    circleSize?: number;
    circleColors?: ColorsMap;
    backgroundColors?: ColorsMap;
    disabled?: boolean;
}

interface State {
    left: Animated.Value;
    mapValue: Animated.Value;
}

export class Switch extends React.PureComponent<SwitchProps, State> {
    public static defaultProps: PickOptional<SwitchProps> = {
        disabled: false,
        circleSize: 26,
        containerStyle: {},
        circleColors: {},
        backgroundColors: {}
    };

    private static config = {
        // background color
        uncheckedDisabled: 0,
        unchecked: 20,
        checkedDisabled: 40,
        checked: 60,
        // animation duration
        animationDuration: 200
    };

    private backgroundColor: Array<{ status: keyof ColorsMap; color: string }> = [
        { status: "uncheckedDisabled", color: "#ecedf380" },
        { status: "unchecked", color: "#ecedf3" },
        { status: "checkedDisabled", color: "rgba(76, 217, 100, 0.5)" },
        { status: "checked", color: "rgb(76, 217, 100)" }
    ];

    private circleBackgroundColor: Array<{ status: keyof ColorsMap; color: string }> = [
        { status: "uncheckedDisabled", color: "#ffffff" },
        { status: "unchecked", color: "#ffffff" },
        { status: "checkedDisabled", color: "#ffffff" },
        { status: "checked", color: "#ffffff" }
    ];

    constructor(props: SwitchProps) {
        super(props);
        this.state = this.initialState(props);
        this.initialColors(props);
    }

    componentDidUpdate(prevProps: SwitchProps) {
        const { checked, disabled } = this.props;
        if (prevProps.checked !== checked || prevProps.disabled !== disabled) {
            const leftDistance = this.getMoveDistance();
            Animated.parallel([
                Animated.timing(this.state.left, {
                    duration: Switch.config.animationDuration,
                    // 22 => styles.container.width - container.circle.width - circle-margin-left
                    toValue: checked ? leftDistance.after : leftDistance.before
                }),
                Animated.timing(this.state.mapValue, {
                    duration: Switch.config.animationDuration,
                    toValue: checked ? (disabled ? Switch.config.checkedDisabled : Switch.config.checked) : disabled ? Switch.config.uncheckedDisabled : Switch.config.unchecked
                })
            ]).start();
        }
    }

    onChange = () => {
        const { onChange, checked } = this.props;
        if (onChange) {
            onChange(!checked);
        }
    };

    initialState(props: SwitchProps): State {
        // 22 => styles.container.width - container.circle.width - circle-margin-left
        const leftDistance = this.getMoveDistance();
        const left = new Animated.Value(props.checked ? leftDistance.after : leftDistance.before);
        const mapValue = props.checked
            ? new Animated.Value(!props.disabled ? Switch.config.checked : Switch.config.checkedDisabled)
            : new Animated.Value(!props.disabled ? Switch.config.unchecked : Switch.config.uncheckedDisabled);
        return { left, mapValue };
    }

    initialColors(props: SwitchProps) {
        const { backgroundColors, circleColors } = props;
        this.backgroundColor.forEach(_ => {
            const colorFromProps = backgroundColors![_.status];
            if (colorFromProps) {
                _.color = colorFromProps;
            }
        });
        this.circleBackgroundColor.forEach(_ => {
            const colorFromProps = circleColors![_.status];
            if (colorFromProps) {
                _.color = colorFromProps;
            }
        });
    }

    getMoveDistance() {
        // TODO: REFACTOR (22, 2)
        const { containerStyle, circleSize } = this.props;
        const containerStyleObj = StyleSheet.flatten(containerStyle!);
        if (typeof containerStyleObj.height !== "string" && typeof containerStyleObj.width !== "string") {
            const before = (containerStyleObj.height || containerHeight - circleSize!) / 2;
            const after = (containerStyleObj.width || containerWidth) - circleSize! - before;
            return { before, after };
        } else {
            throw new Error("Switch: containerStyle.height or containerStyle.width just support number type");
        }
    }

    render() {
        const { disabled, containerStyle, circleSize } = this.props;
        const range = [Switch.config.uncheckedDisabled, Switch.config.unchecked, Switch.config.checkedDisabled, Switch.config.checked];
        return (
            <Touchable disabled={disabled} activeOpacity={1} onPress={this.onChange} style={[styles.container, containerStyle]}>
                <Animated.View
                    style={[
                        styles.background,
                        {
                            backgroundColor: this.state.mapValue.interpolate({
                                inputRange: range,
                                outputRange: this.backgroundColor.map(_ => _.color)
                            })
                        }
                    ]}
                />
                <Animated.View
                    style={[
                        styles.circle,
                        { width: circleSize, height: circleSize, borderRadius: circleSize! / 2 },
                        {
                            left: this.state.left,
                            backgroundColor: this.state.mapValue.interpolate({
                                inputRange: range,
                                outputRange: this.circleBackgroundColor.map(_ => _.color)
                            })
                        }
                    ]}
                />
            </Touchable>
        );
    }
}

const containerHeight = 30;
const containerWidth = 50;
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        height: containerHeight,
        width: containerWidth,
        overflow: "visible"
    },
    background: {
        flex: 1,
        borderRadius: containerHeight / 2
    },
    circle: {
        position: "absolute"
    }
});
