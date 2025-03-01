import React, { useState } from 'react';
import { SafeAreaView, Button, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {

  const [lista, setLista] = useState([
    { id: '1', nome: 'Leite', checked: true },
    { id: '2', nome: 'Pão', checked: true },
    { id: '3', nome: 'Ovos', checked: false },
    { id: '4', nome: 'Arroz', checked: false },
    { id: '5', nome: 'Feijão', checked: false },
    { id: '6', nome: 'Sal', checked: false },
    { id: '7', nome: 'Macarrão', checked: false },
    { id: '8', nome: 'Batata', checked: false },
    { id: '9', nome: 'Salsa', checked: false },
    { id: '10', nome: 'Tapioca', checked: false }
]);

const toggleChecked = (id: string) => {
    setLista(lista.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
};

const removeItem = (id: string) => {
    setLista(lista.filter(item => item.id !== id));
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
            <Text style={styles.header}>JANEIRO</Text>

            <FlatList
                data={lista.filter(item => !item.checked)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => toggleChecked(item.id)} style={styles.checkbox}>
                            {item.checked ? <FontAwesome name="check-square" size={24} color="green" /> : 
                                            <FontAwesome name="square-o" size={24} color="black" />}
                        </TouchableOpacity>
                        <Text style={styles.itemText}>{item.nome}</Text>
                        <TouchableOpacity onPress={() => {}} style={styles.icon}>
                            <FontAwesome name="pencil" size={20} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.icon}>
                            <FontAwesome name="trash" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Text style={styles.subheader}>Comprado</Text>
            <FlatList
                data={lista.filter(item => item.checked)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => toggleChecked(item.id)} style={styles.checkbox}>
                            {item.checked ? <FontAwesome name="check-square" size={24} color="green" /> : 
                                            <FontAwesome name="square-o" size={24} color="black" />}
                        </TouchableOpacity>
                        <Text style={[styles.itemText, { textDecorationLine: 'line-through', color: 'gray' }]}>
                            {item.nome}
                        </Text>
                    </View>
                )}
            />

            {/* Barra de Navegação */}
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Index')}>
                    <Text style={styles.navText}>🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Meses')}>
                    <Text style={styles.navText}>📅</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Adicionar')}>
                    <Text style={styles.navText}>➕</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
  },
  header: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
  },
  subheader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      backgroundColor: '#ddd',
      padding: 5,
      textAlign: 'center',
  },
  item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ddd',
  },
  checkbox: {
      marginRight: 10,
  },
  itemText: {
      flex: 1,
      fontSize: 18,
  },
  icon: {
      marginLeft: 10,
  },
  navBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 15,
      borderTopWidth: 1,
      borderColor: '#ddd',
      marginTop: 20,
  },
  navText: {
      fontSize: 24,
  },
});



