import { StyleSheet, Platform } from "react-native";

export const commonStyle = StyleSheet.create({
    flex1: { flex: 1 },
    center: { justifyContent: "center", alignItems: "center" },
    shadow: Platform.select({
        ios: {
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4
        },
        android: {
            elevation: 4
        }
    })
});

export const colors = {
    blue: "#007aff",
    white: "#ffffff",
    gray: "#f1f5fd",
    grayDisabled: "#dddddd"
};

export const radius = {
    main: 4,
    input: 4
};
