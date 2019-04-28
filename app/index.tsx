import * as React from "react";
import { StyleSheet, View, Button } from "react-native";

import { Modal, OverlayManager, Toast, CloseOverlayProps, registerOverlayTypeComponent } from "component";

interface State {}

interface ModalTestProps extends CloseOverlayProps {
    a: number;
}

const ModalTest = (props: ModalTestProps) => (
    <View style={{ height: 100, width: 200, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <Button title={`close Modal ${props.a}`} onPress={props.onTriggerHide} />
    </View>
);

const ModalTestWithClose = registerOverlayTypeComponent(ModalTest);

export default class App extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            showOverlay: true
        };
    }

    showOverlay = () => this.setState({ showOverlay: true });

    hideOverlay = () => this.setState({ showOverlay: false });

    removeOverlay = () => this.setState({ showOverlay: null });

    showModal = () => {
        const A = <ModalTestWithClose a={2000} />;
        // TODO： 使用函数组件，modal 无法控制事件冒泡
        Modal.push(A);
    };

    count = 0;
    showToast = () => {
        Toast.push(this.count++);
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="show Modal" onPress={this.showModal} />
                <Button title="show toast" onPress={this.showToast} />
                <OverlayManager />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5FCFF"
    }
});
