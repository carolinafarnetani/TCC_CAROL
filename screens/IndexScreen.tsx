import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function IndexScreen({ navigation }: any) {

    return (
        <View style={styles.container}>
        <Text style={styles.title}>MINHA LISTA DE COMPRAS</Text>

        <FontAwesome name="shopping-cart" size={80} color="red" style={styles.cartIcon} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartIcon: {
        marginBottom: 20, 
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});









// import { Link, router } from "expo-router";
// import { Text, View, StyleSheet, Pressable } from "react-native";

// export default function Screen() {

//     const handleClick = () => {
//         router.navigate('/home')
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>MINHA LISTA DE COMPRAS</Text>
//             {/* <Link href="/home" asChild> */}
//                 <Pressable onPress={handleClick} style={styles.button}>
//                     <Text style={styles.buttonText}>Começar</Text>
//                 </Pressable>
//             {/* </Link> */}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: "#f5f5f5",
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: "bold",
//         marginBottom: 20,
//     },
//     button: {
//         backgroundColor: "#007bff",
//         paddingVertical: 12,
//         paddingHorizontal: 24,
//         borderRadius: 8,
//         elevation: 3, // Sombra no Android
//         shadowColor: "#000", // Sombra no iOS
//         shadowOffset: { width: 2, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 3,
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "bold",
//         textAlign: "center",
//     },
// });