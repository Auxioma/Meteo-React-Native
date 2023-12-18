import { StyleSheet } from "react-native";

const s = StyleSheet.create({
    container:{
        flex:1,
        //backgroundColor:"red",
    },
    img_background:{
        flex:1,
        backgroundColor:"black",
        padding:20,
    },
    //Filtre superposé sur l'image grace a la propriété imageStyle de BackgroundImage
    img:{
        opacity:0.75, // oppacité de l'image grace au fond noir de img_background
    }
});

export { s };