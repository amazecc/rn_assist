import * as React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

export const Box: React.FunctionComponent<{ title: string }> = props => (
    <View style={styles.boxContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.box}>{props.children}</View>
    </View>
);

export const Space: React.FunctionComponent = () => <View style={styles.space} />;

const styles = StyleSheet.create({
    boxContainer: {
        padding: 20,
        backgroundColor: "#fff",
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 3
            },
            android: {
                elevation: 2
            }
        })
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007aff"
    },
    box: {
        borderTopWidth: 1,
        borderColor: "#ccc",
        marginTop: 10,
        paddingTop: 10,
        alignItems: "flex-start"
    },
    space: {
        height: 10
    }
});
