import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { Modal, OverlayManager, Toast } from "component";

interface State {}

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
        Modal.push(
            <View style={{ height: 100, width: 200, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
                <Button title="close Modal" onPress={Modal.pop} />
            </View>
        );
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
