import AsyncStorage from '@react-native-async-storage/async-storage';

interface Produto {
    id: number;
    nome: string;
    checked: number;
}

const STORAGE_KEY = '@produtos';
let currentId = 1;

export const initDatabase = async (): Promise<void> => {
    try {
        const produtos = await AsyncStorage.getItem(STORAGE_KEY);
        if (!produtos) {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        } else {
            const parsedProdutos = JSON.parse(produtos) as Produto[];
            if (parsedProdutos.length > 0) {
                currentId = Math.max(...parsedProdutos.map(p => p.id)) + 1;
            }
        }
    } catch (error) {
        console.error('Erro ao inicializar storage:', error);
        throw error;
    }
};

export const getProdutos = async (): Promise<Produto[]> => {
    try {
        const produtos = await AsyncStorage.getItem(STORAGE_KEY);
        return produtos ? JSON.parse(produtos) : [];
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
};

export const addProduto = async (nome: string): Promise<number> => {
    try {
        const produtos = await getProdutos();
        const novoProduto: Produto = {
            id: currentId++,
            nome,
            checked: 0
        };
        produtos.push(novoProduto);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
        return novoProduto.id;
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        throw error;
    }
};

export const updateProduto = async (id: number, nome: string): Promise<void> => {
    try {
        const produtos = await getProdutos();
        const index = produtos.findIndex(p => p.id === id);
        if (index !== -1) {
            produtos[index].nome = nome;
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
        }
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        throw error;
    }
};

export const toggleProdutoStatus = async (id: number, checked: boolean): Promise<void> => {
    try {
        const produtos = await getProdutos();
        const index = produtos.findIndex(p => p.id === id);
        if (index !== -1) {
            produtos[index].checked = checked ? 1 : 0;
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
        }
    } catch (error) {
        console.error('Erro ao alterar status do produto:', error);
        throw error;
    }
};

export const deleteProduto = async (id: number): Promise<void> => {
    try {
        const produtos = await getProdutos();
        const novosProdutos = produtos.filter(p => p.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosProdutos));
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        throw error;
    }
}; 