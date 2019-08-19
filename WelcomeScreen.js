import App from './App';
import { colorObject } from './components/ColorConfig'
import React, { Component, PropTypes } from "react";
import {
    StyleSheet,
    AsyncStorage,
    Modal,
    View,
    Text,
    TouchableHighlight
} from "react-native";


export default class FtueScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    componentDidMount() {
        AsyncStorage.getItem(this.props.pagekey, (err, result) => {
            if (err) {
            } 
            else {
                if (result == null) {
                    console.log("null value recieved", result);
                    this.setModalVisible(true);
                } else {
                    console.log("result", result);
                }
            }
        });
        AsyncStorage.setItem(this.props.pagekey, JSON.stringify({ "value": "true" }), (err, result) => {
            console.log("error", err, "result", result);
        });
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    render() {
        return (
            <View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    style={styles.ftreContainer}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.ftreContainer}>
                        <View style={styles.ftreTitleContainer}>
                            <Text style={styles.ftreTitle}>{this.props.title}</Text>
                        </View>
                        <View style={styles.ftreDescriptionContainer}>
                            <Text style={styles.ftreDescription} allowFontScaling={true}>
                                {this.props.description}
                            </Text>
                        </View>
                        <View style={styles.ftreExitContainer}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                            >
                                <View style={styles.ftreExitButtonContainer}>
                                    <Text style={styles.ftreExitButtonText}>Proceed</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ftreContainer: {
        backgroundColor: colorObject.PrimaryColor,
        flex: 1,
    },
    ftreTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    ftreDescription: {
        color: 'white',
        fontSize: 15,
        marginRight: 20,
        marginLeft: 20
    },
    ftreCloseIcon: {
        alignSelf: 'flex-end',
        flex: 0.5,
        marginRight: 10
    },
    ftreTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ftreDescriptionContainer: {
        flex: 6.5
    },
    ftreExitContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ftreExitButtonContainer: {
        width: 200,
        height: 40,
        backgroundColor: colorObject.SecondaryColor,
        borderRadius: 10,
        justifyContent: 'center',
    },
    ftreExitButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});