import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { Overlay, OverlayManager } from "component";
import { commonStyle } from "component/common";

interface State {
}

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
        const { destroy } = OverlayManager.pushModal(
            <View style={{ height: 100, width: 200, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
                <Button title="close Modal" onPress={OverlayManager.pop} />
            </View>
        );

        setTimeout(destroy, 2000);
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="show Modal" onPress={this.showModal} />
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
