import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import * as Animatable from "react-native-animatable";
import { PickOptional } from "component/type";

export interface AnimatedViewProps {
    // private
    visible: boolean;
    onHide: () => void;
    // public
    animations?: [Animatable.Animation, Animatable.Animation];
    duration?: number;
    style?: StyleProp<ViewStyle>; // just for Toast
}

interface State {
    visible: boolean;
}

export class AnimatedView extends React.PureComponent<AnimatedViewProps, State> {
    public static defaultProps: PickOptional<AnimatedViewProps> = {
        duration: 300,
        animations: ["fadeIn", "fadeOut"]
    };

    constructor(props: AnimatedViewProps) {
        super(props);
        this.state = {
            visible: props.visible // default is true
        };
    }

    componentDidUpdate(prevProps: Readonly<AnimatedViewProps>, prevState: Readonly<State>) {
        const { visible } = this.props;
        if (prevProps.visible !== visible) {
            this.setState({ visible: false });
        }
    }

    onAnimationEnd = () => {
        if (!this.state.visible) {
            this.props.onHide();
        }
    };

    render() {
        const { style, visible, animations, duration, children } = this.props;
        return (
            <Animatable.View useNativeDriver pointerEvents="box-none" duration={duration} onAnimationEnd={this.onAnimationEnd} animation={visible ? animations![0] : animations![1]} style={style}>
                {children}
            </Animatable.View>
        );
    }
}
