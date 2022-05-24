import { getById, getAllCategories as getAll, createCategory } from '../data/categories/index.js';
import { addLog } from './logs.controller.js';
const getCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await getById(categoryId);
        res.send(category);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await getAll();
        res.send(categories);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const addCategory = async (req, res, next) => {
    try {
        const data = req.body;
        await createCategory(data);
        addLog({
            idLog: `ADD_CATEGORY_${data.title}_${new Date().getTime()}`,
            message: `Categoria ${data.title} adicionada`,
            type: 4,
            dateTime: new Date()
        });
        res.send('Categoria criada com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export {
    getCategory, getAllCategories, addCategory
};