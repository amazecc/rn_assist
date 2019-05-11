import * as React from "react";
import { Animated, StyleSheet } from "react-native";
import { Touchable } from "./Touchable";
import { PickOptional } from "./type";
import { commonStyle } from "./common";

interface ColorsMap {
    uncheckedDisabled?: string;
    unchecked?: string;
    checkedDisabled?: string;
    checked?: string;
}

interface Margin {
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    marginVertical?: number;
    marginHorizontal?: number;
}

export interface SwitchProps {
    checked?: boolean;
    onChange?: (isChecked: boolean) => void;
    height?: number;
    width?: number;
    margin?: Margin;
    circleSize?: number;
    circleColors?: ColorsMap;
    backgroundColors?: ColorsMap;
    disabled?: boolean;
}

interface State {
    innerWidth: Animated.Value;
    mapValue: Animated.Value;
}

export class Switch extends React.PureComponent<SwitchProps, State> {
    public static readonly defaultProps: PickOptional<SwitchProps> = {
        disabled: false,
        circleSize: 26,
        width: 50,
        height: 30,
        circleColors: {},
        backgroundColors: {}
    };

    private static readonly config = {
        range: [0, 10],
        defaultSize: {
            height: 30,
            width: 50
        },
        animationDuration: 200
    };

    private readonly backgroundColors: Array<{ status: keyof ColorsMap; color: string }> = [
        { status: "uncheckedDisabled", color: "#ecedf380" },
        { status: "unchecked", color: "#ecedf3" },
        { status: "checkedDisabled", color: "rgba(76, 217, 100, 0.5)" },
        { status: "checked", color: "rgb(76, 217, 100)" }
    ];

    private readonly circleColors: Array<{ status: keyof ColorsMap; color: string }> = [
        { status: "uncheckedDisabled", color: "#ffffff" },
        { status: "unchecked", color: "#ffffff" },
        { status: "checkedDisabled", color: "#ffffff" },
        { status: "checked", color: "#ffffff" }
    ];

    private movingViewWidth: { unchecked: number; checked: number } | undefined;

    private space: number | undefined;

    constructor(props: SwitchProps) {
        super(props);
        this.initialColors();
        this.setSpace();
        this.setMovingViewWidth();
        this.state = this.initialState(props);
    }

    componentDidUpdate(prevProps: SwitchProps) {
        const { checked, disabled } = this.props;
        if (prevProps.checked !== checked || prevProps.disabled !== disabled) {
            Animated.parallel([
                Animated.timing(this.state.innerWidth, {
                    duration: Switch.config.animationDuration,
                    toValue: checked ? this.movingViewWidth!.checked : this.movingViewWidth!.unchecked
                }),
                Animated.timing(this.state.mapValue, {
                    duration: Switch.config.animationDuration,
                    toValue: checked ? Switch.config.range[1] : Switch.config.range[0]
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
        const innerWidth = new Animated.Value(props.checked ? this.movingViewWidth!.checked : this.movingViewWidth!.unchecked);
        const mapValue = new Animated.Value(props.checked ? Switch.config.range[1] : Switch.config.range[0]);
        return { innerWidth, mapValue };
    }

    initialColors() {
        const { backgroundColors, circleColors } = this.props;
        this.backgroundColors.forEach(_ => {
            const colorFromProps = backgroundColors![_.status];
            if (colorFromProps) {
                _.color = colorFromProps;
            }
        });
        this.circleColors.forEach(_ => {
            const colorFromProps = circleColors![_.status];
            if (colorFromProps) {
                _.color = colorFromProps;
            }
        });
    }

    setMovingViewWidth() {
        const { circleSize, width } = this.props;
        this.movingViewWidth = { unchecked: circleSize! + this.space! * 2, checked: width! };
    }

    setSpace() {
        const { circleSize, height } = this.props;
        const space = (height! - circleSize!) / 2;
        this.space = circleSize! > height! ? 0 : space!;
    }

    render() {
        const { disabled, circleSize, height, width, margin } = this.props;
        const backgroundColors = disabled ? [this.backgroundColors[0].color, this.backgroundColors[2].color] : [this.backgroundColors[1].color, this.backgroundColors[3].color];
        const circleColors = disabled ? [this.circleColors[0].color, this.circleColors[2].color] : [this.circleColors[1].color, this.circleColors[3].color];
        return (
            <Touchable
                disabled={disabled}
                activeOpacity={1}
                onPress={this.onChange}
                style={[
                    Switch.config.defaultSize,
                    { height, width, borderRadius: height! / 2, backgroundColor: disabled ? this.backgroundColors[0].color : this.backgroundColors[1].color, ...margin }
                ]}
            >
                <Animated.View
                    style={[
                        styles.movingView,
                        {
                            backgroundColor: this.state.mapValue.interpolate({
                                inputRange: Switch.config.range,
                                outputRange: backgroundColors
                            }),
                            width: this.state.innerWidth,
                            borderRadius: height! / 2
                        }
                    ]}
                >
                    <Animated.View
                        style={[
                            commonStyle.shadow,
                            { width: circleSize, height: circleSize, borderRadius: circleSize! / 2 },
                            {
                                backgroundColor: this.state.mapValue.interpolate({
                                    inputRange: Switch.config.range,
                                    outputRange: circleColors
                                }),
                                marginHorizontal: this.space
                            }
                        ]}
                    />
                </Animated.View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    movingView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    }
});
