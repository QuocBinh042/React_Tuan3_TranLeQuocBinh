import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function App({ navigation }) {
    const [data, setData] = useState([
        { key: '1', type: 'Vegetable', name: 'Apple Italian Piada', price: "28.00", image: require('../assets/Data/Image_101.png'), sl: 2 },
        { key: '2', type: 'Vegetable', name: 'Pear American', price: "15.00", image: require('../assets/Data/Image_102.png'), sl: 1 },
        { key: '3', type: 'Vegetable', name: 'Coconut Vietnam', price: "10.00", image: require('../assets/Data/Image_103.png'), sl: 3 },
        { key: '4', type: 'Vegetable', name: 'Apricot China', price: "9.00", image: require('../assets/Data/Image_105.png'), sl: 1 },
        { key: '5', type: 'Vegetable', name: 'Orange Thailand', price: "8.00", image: require('../assets/Data/Image_106.png'), sl: 1 },
        { key: '6', type: 'Vegetable', name: 'Avocado Vietnam', price: "10.00", image: require('../assets/Data/Image_107.png'), sl: 1 },
    ]);

    const total = data.reduce((sum, item) => sum + (parseFloat(item.price) * item.sl), 0).toFixed(2);

    const increaseQuantity = (key) => {
        setData(data.map(item => item.key === key ? { ...item, sl: item.sl + 1 } : item));
    };

    const decreaseQuantity = (key) => {
        setData(data.map(item => item.key === key && item.sl > 1 ? { ...item, sl: item.sl - 1 } : item));
    };

    return (
        <ScrollView stickyHeaderIndices={[0]}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Screen_02") }}>
                        <Image source={require('../assets/Data/Image_183.png')} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.header}>My Basket</Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Image source={item.image} style={styles.itemImage} resizeMode='contain' />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemPrice}>${item.price}</Text>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <View style={styles.ratingContainer}>
                                    {[...Array(5)].map((_, index) => (
                                        <Image key={index} source={require('../assets/Data/Image_180.png')} style={styles.starIcon} />
                                    ))}
                                </View>
                            </View>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => decreaseQuantity(item.key)}>
                                    <Image source={require('../assets/Data/Image_176.png')} style={styles.adjustIcon} />
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.sl}</Text>
                                <TouchableOpacity onPress={() => increaseQuantity(item.key)}>
                                    <Image source={require('../assets/Data/Image_175.png')} style={styles.adjustIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.key}
                />
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalAmount}>${total}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Screen_02") }}>
                    <Text style={styles.buttonText}>Payment</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '90%',
    },
    backIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    header: {
        fontSize: 25,
        color: 'green',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    itemContainer: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: 'lightgray',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    itemImage: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemPrice: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green',
    },
    itemName: {
        fontSize: 18,
        color: 'silver',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    starIcon: {
        width: 15,
        height: 15,
        marginRight: 2,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    adjustIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 20,
        padding: 10,
        borderTopWidth: 1,
        borderColor: 'lightgray',
    },
    totalLabel: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'purple',
    },
    totalAmount: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'purple',
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 40,
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});