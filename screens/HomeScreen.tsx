import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { initDatabase, getProdutos, toggleProdutoStatus, deleteProduto } from '../database';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}

interface Produto {
    id: number;
    nome: string;
    checked: number;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [lista, setLista] = useState<Produto[]>([]);

    useEffect(() => {
        const setup = async () => {
            try {
                await initDatabase();
                await carregarProdutos();
            } catch (error) {
                console.error('Erro ao inicializar:', error);
                Alert.alert('Erro', 'Não foi possível inicializar o app');
            }
        };
        setup();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            carregarProdutos();
        }, [])
    );

    const carregarProdutos = async () => {
        try {
            const produtos = await getProdutos();
            setLista(produtos);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            Alert.alert('Erro', 'Não foi possível carregar os produtos');
        }
    };

    const handleToggleChecked = async (id: number, checked: boolean) => {
        try {
            await toggleProdutoStatus(id, !checked);
            await carregarProdutos();
        } catch (error) {
            console.error('Erro ao alterar status:', error);
            Alert.alert('Erro', 'Não foi possível alterar o status do produto');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduto(id);
            await carregarProdutos();
        } catch (error) {
            console.error('Erro ao deletar:', error);
            Alert.alert('Erro', 'Não foi possível deletar o produto');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            
            <Text style={styles.header}>Lista de Compras</Text>
                
                    <FlatList style={styles.scroolList}
                        data={lista.filter(item => item.checked === 0)}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <TouchableOpacity onPress={() => handleToggleChecked(item.id, item.checked === 1)} style={styles.checkbox}>
                                    {item.checked === 1 ? 
                                        <FontAwesome name="check-square" size={24} color="green" /> : 
                                        <FontAwesome name="square-o" size={24} color="black" />}
                                </TouchableOpacity>
                                <Text style={styles.itemText}>{item.nome}</Text>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('Adicionar', { editMode: true, produto: item })} 
                                    style={styles.icon}
                                >
                                    <FontAwesome name="pencil" size={20} color="blue" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.icon}>
                                    <FontAwesome name="trash" size={20} color="red" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                

            <Text style={styles.subheader}>Comprado</Text>
                
                <FlatList style={styles.scroolList02}
                    data={lista.filter(item => item.checked === 1)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => handleToggleChecked(item.id, item.checked === 1)} style={styles.checkbox}>
                                {item.checked === 1 ? 
                                    <FontAwesome name="check-square" size={24} color="green" /> : 
                                    <FontAwesome name="square-o" size={24} color="black" />}
                            </TouchableOpacity>
                            <Text style={[styles.itemText, { textDecorationLine: 'line-through', color: 'gray' }]}>
                                {item.nome}
                            </Text>
                        </View>
                    )}
                />
                
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Adicionar', { editMode: false })}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    scroolList:{
        height: '60%',
        marginTop: 5,
    },
    scroolList02:{
        height: '20%',
        marginTop: 5,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subheader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        backgroundColor: '#f0f0f0',
        padding: 10,
        textAlign: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    checkbox: {
        marginRight: 15,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
    },
    icon: {
        marginLeft: 10,
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    addButtonText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
});



