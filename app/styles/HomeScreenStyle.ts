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
    }
    

})