const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
    }
    async save(object) {
        try {
        if (fs.existsSync(this.file)) {
            const data = await fs.promises.readFile(this.file);
            const array = JSON.parse(data);
            object.id = array.length + 1;
            array.push(object);
            await fs.promises.writeFile(this.file, JSON.stringify(array, null, 2));
        } else {
            object.id = 1;
            await fs.promises.writeFile(this.file, JSON.stringify([object]));
        }
        } catch (err) {
        throw new Error(err);
        }
    }
    async update(product) {
        try {
        if (fs.existsSync(this.file)) {
            const data = await fs.promises.readFile(this.file);
            const array = JSON.parse(data);
            const index = product.id - 1;
            array[index] = product;
            await fs.promises.writeFile(this.file, JSON.stringify(array, null, 2));
        } else {
            throw new Error('Archivo inexistente');
        }
        } catch (err) {
        throw new Error(err);
        }
    }
    async delete(id) {
        try {
        if (fs.existsSync(this.file)) {
            const data = await fs.promises.readFile(this.file);
            const array = JSON.parse(data);
            const index = array.findIndex(p => p.id === id);
            array.splice(index, 1);
            await fs.promises.writeFile(this.file, JSON.stringify(array, null, 2));
        } else {
            throw new Error('Archivo inexistente');
        }
        } catch (err) {
        throw new Error(err);
        }
    }
}

module.exports = Contenedor;