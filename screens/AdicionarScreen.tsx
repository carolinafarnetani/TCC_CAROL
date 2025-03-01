import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { addProduto, updateProduto } from '../database';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type AdicionarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Adicionar'>;
type AdicionarScreenRouteProp = RouteProp<RootStackParamList, 'Adicionar'>;

interface AdicionarScreenProps {
    navigation: AdicionarScreenNavigationProp;
    route: AdicionarScreenRouteProp;
}

export default function AdicionarScreen({ navigation, route }: AdicionarScreenProps) {
    const [nomeProduto, setNomeProduto] = useState('');
    const editMode = route.params?.editMode || false;
    const produtoParaEditar = route.params?.produto;

    useEffect(() => {
        if (editMode && produtoParaEditar) {
            setNomeProduto(produtoParaEditar.nome);
        }
    }, [editMode, produtoParaEditar]);

    const handleSalvar = async () => {
        if (!nomeProduto.trim()) {
            Alert.alert('Erro', 'Por favor, insira um nome para o produto');
            return;
        }

        try {
            if (editMode && produtoParaEditar) {
                await updateProduto(produtoParaEditar.id, nomeProduto);
                Alert.alert('Sucesso', 'Produto atualizado com sucesso');
            } else {
                await addProduto(nomeProduto);
                Alert.alert('Sucesso', 'Produto adicionado com sucesso');
            }
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            Alert.alert('Erro', 'Não foi possível salvar o produto');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {editMode ? 'Editar Produto' : 'Adicionar Produto'}
            </Text>
            <TextInput
                style={styles.input}
                value={nomeProduto}
                onChangeText={setNomeProduto}
                placeholder="Nome do produto"
                autoFocus
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.saveButton]} 
                    onPress={handleSalvar}
                >
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: '#007AFF',
    },
    cancelButton: {
        backgroundColor: '#FF3B30',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
