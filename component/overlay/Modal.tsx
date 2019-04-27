import * as React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { commonStyle } from "component/common";
import { Overlay, OverlayProps } from "./Overlay";

export interface ModalProps extends OverlayProps {}

export class Modal extends React.PureComponent<ModalProps> {
    render() {
        const { children, ...overlayProps } = this.props;
        return (
            <Overlay {...overlayProps} style={commonStyle.center}>
                <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
            </Overlay>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "#00000080",
        ...StyleSheet.absoluteFillObject
    }
});
