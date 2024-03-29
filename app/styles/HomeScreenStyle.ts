import { StyleSheet } from "react-native";
import { AppColor, FontSize } from "../utils/StyleConstant";

export default StyleSheet.create({
    heading: {
        fontSize: FontSize.heading,
        color: AppColor.black,
        fontWeight: 'bold'
        // textAlign: 'center'
    },
    subHeading: {
        fontSize: FontSize.large
    },
    enableLocationImage: {
        height: 350,
        width: 350,
        alignSelf: 'center'
        // borderColor: 'red',
        // borderWidth: 2

    },
    locationNotOnText: {
        fontSize: FontSize.heading,
        textAlign: 'center',
        marginBottom: 20
    },
    // List View Styles -
    bottomView: {
        width: "100%",
        position: "absolute",
        alignSelf: 'center',
        bottom: 10,
        justifyContent: 'space-between'
      }
})