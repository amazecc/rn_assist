import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { Box, Space } from "./Box";
import { Modal, OverlayManager, toast, Touchable, Button, Switch } from "component";

interface State {
    switchValue: boolean;
}

export default class App extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            switchValue: false
        };
    }

    showModal = () => {
        const ModalTest = () => (
            <View style={{ height: 100, width: 200, justifyContent: "center", alignItems: "center", backgroundColor: color.white }}>
                <Button text={`close Modal`} onPress={Modal.pop} />
            </View>
        );
        const { destroy } = Modal.push(<ModalTest />);
        setTimeout(destroy, 3000);
    };

    showToastText = () => toast("text");

    showToastElement = () => {
        toast(
            <View style={{ width: 200, height: 100, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: color.white, fontSize: 24 }}>react element</Text>
            </View>,
            {
                style: {
                    backgroundColor: color.blue
                },
                animations: ["bounceIn", "swing"]
            }
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Box title="Modal">
                        <Button text="show Modal" onPress={this.showModal} />
                    </Box>
                    <Box title="Toast">
                        <Button text="show toast text" onPress={this.showToastText} />
                        <Space />
                        <Button text="show toast element" onPress={this.showToastElement} />
                    </Box>
                    <Box title="Touchable">
                        <Touchable onPress={() => toast("纯色")} style={{ backgroundColor: color.blue, height: 40, width: 100, justifyContent: "center", alignItems: "center" }} />
                        <Space />
                        <Touchable
                            {...gradient.blueProps}
                            onPress={() => toast("渐变")}
                            style={{ backgroundColor: color.blue, height: 40, width: 100, justifyContent: "center", alignItems: "center" }}
                        />
                        <Space />
                        <Touchable style={{ height: 40, width: 100, borderWidth: 1, borderColor: color.blue }} />
                        <Space />
                        <Touchable style={{ height: 40, width: 100, borderWidth: 1, borderColor: color.blue, borderRadius: 30, backgroundColor: color.white }} />
                    </Box>
                    <Box title="Button">
                        <Button {...gradient.yellowProps} text="按钮1" />
                        <Space />
                        <Button {...gradient.purpleProps} text="按钮2" />
                    </Box>
                    <Box title="Switch">
                        <Switch checked={this.state.switchValue} onChange={switchValue => this.setState({ switchValue })} />
                        <Space />
                        <Switch disabled checked={this.state.switchValue} onChange={switchValue => this.setState({ switchValue })} />
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

const color = {
    blue: "#007aff",
    white: "#ffffff",
    black: "#000000"
};

const gradient = {
    blueProps: { colors: ["#137efa", "#3ebbfb"], start: { x: 0, y: 1 }, end: { x: 1, y: 1 }, locations: [0, 1] },
    whiteProps: { colors: ["#ffffff", "#ffffff"], locations: [0, 1] },
    lightGrayPureProps: { colors: ["#f1f5fd", "#f1f5fd"], locations: [0, 1] },
    purpleProps: { colors: ["#773efc", "#b459f8"], start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, locations: [0, 1] },
    yellowProps: { colors: ["#ffb75d", "#fba622"], start: { x: 0, y: 1 }, end: { x: 1, y: 0 }, locations: [0, 1] },
    redProps: { colors: ["#f99f63", "#ff6753"], start: { x: 0, y: 1 }, end: { x: 1, y: 0 }, locations: [0, 1] }
};
