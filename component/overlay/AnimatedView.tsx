import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import * as Animatable from "react-native-animatable";
import { PickOptional } from "component/type";

interface Props {
    visible: boolean;
    onHide: () => void;
    animations?: [string, string];
    onShow?: () => void;
    duration?: number;
    style?: StyleProp<ViewStyle>;
}

interface State {
    visible: boolean;
}

export class AnimatedView extends React.PureComponent<Props, State> {
    public static defaultProps: PickOptional<Props> = {
        duration: 300,
        animations: ["fadeIn", "fadeOut"]
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            visible: props.visible // default is true
        };
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        const { visible } = this.props;
        if (prevProps.visible !== visible) {
            this.setState({ visible: false });
        }
    }

    onAnimationEnd = () => {
        const { onHide, onShow } = this.props;
        if (this.state.visible) {
            if (onShow) {
                onShow();
            }
        } else {
            onHide();
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
