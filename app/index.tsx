import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { Overlay } from "component";

interface State {
    showOverlay: boolean;
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

    render() {
        const { showOverlay } = this.state;
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <Button title="show overlay" onPress={this.showOverlay} />
                </View>

                <Overlay visible={showOverlay} onClose={this.hideOverlay} style={{ justifyContent: "center", alignContent: "center" }}>
                    <Button title="close overlay" onPress={this.hideOverlay} />
                </Overlay>
            </React.Fragment>
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
