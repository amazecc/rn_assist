import * as React from "react";
import { StyleSheet, View, Button, Text, SafeAreaView, ScrollView } from "react-native";
import { Box } from "./Box";
import { Modal, OverlayManager, toast } from "component";

interface State {}

export default class App extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    showModal = () => {
        const ModalTest = () => (
            <View style={{ height: 100, width: 200, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
                <Button title={`close Modal`} onPress={Modal.pop} />
            </View>
        );
        const { destroy } = Modal.push(<ModalTest />);
        setTimeout(destroy, 3000);
    };

    showToastText = () => toast("text");

    showToastElement = () =>
        toast(
            <View style={{ width: 200, height: 100, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#fff", fontSize: 24 }}>react element</Text>
            </View>,
            {
                style: {
                    backgroundColor: "#007aff"
                },
                animations: ["bounceIn", "swing"]
            }
        );

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Box title="Modal">
                        <Button title="show Modal" onPress={this.showModal} />
                    </Box>
                    <Box title="Toast">
                        <Button title="show toast text" onPress={this.showToastText} />
                        <Button title="show toast element" onPress={this.showToastElement} />
                    </Box>
                </ScrollView>
                <OverlayManager />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    scrollView: {
        padding: 20
    }
});
