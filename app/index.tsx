import * as React from "react";
import { StyleSheet, View, Button, Text } from "react-native";

import { Modal, OverlayManager, toast, CloseOverlayProps, registerOverlayTypeComponent } from "component";

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
        Modal.push(A);
    };

    count = 0;
    showToastText = () => {
        toast(this.count++);
    };

    showToastElement = () => {
        toast(
            <View style={{ width: 100, height: 100, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#fff", fontSize: 24 }}>toast</Text>
            </View>,
            {
                style: {
                    backgroundColor: "red"
                },
                animations: ["bounceIn", "swing"]
            }
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="show Modal" onPress={this.showModal} />
                <Button title="show toast text" onPress={this.showToastText} />
                <Button title="show toast element" onPress={this.showToastElement} />
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
