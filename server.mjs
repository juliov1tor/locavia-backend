import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// middleware
app.use(cors());
app.use(bodyParser.json());

// Rota pra obter todos os veículos
app.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await prisma.vehicle.findMany();
        res.json(vehicles);
    } catch (error) {
        console.error("Erro ao buscar veículos:", error);
        res.status(500).json({ error: "Erro ao buscar veículos" });
    }
});

// Rota pra criar um veiculo
app.post('/vehicles', async (req, res) => {
    const { placa, chassi, renavam, modelo, marca, ano } = req.body;
    console.log("Dados recebidos:", req.body);

    try {
        // Verifica se a placa, chassi ou renavam já existem
        const placaExists = await prisma.vehicle.findUnique({
            where: { placa },
        });

        if (placaExists) {
            return res.status(400).json({ error: 'A placa já foi cadastrada.' });
        }

        const chassiExists = await prisma.vehicle.findUnique({
            where: { chassi },
        });

        if (chassiExists) {
            return res.status(400).json({ error: 'O chassi já foi cadastrado.' });
        }

        const renavamExists = await prisma.vehicle.findUnique({
            where: { renavam },
        });

        if (renavamExists) {
            return res.status(400).json({ error: 'O renavam já foi cadastrado.' });
        }

        // Cria o novo veículo
        const vehicle = await prisma.vehicle.create({
            data: { placa, chassi, renavam, modelo, marca, ano },
        });

        res.status(201).json(vehicle);
    } catch (error) {
        console.error("Erro ao criar veículo:", error);
        res.status(500).json({ error: "Erro ao criar veículo", details: error.message });
    }
});

// Rota para atualizar um veículo
app.put('/vehicles/:id', async (req, res) => {
    const { id } = req.params;
    const { placa, chassi, renavam, modelo, marca, ano } = req.body;
    try {
        // Atualiza o veículo com o ID especificado
        const updatedVehicle = await prisma.vehicle.update({
            where: { id: parseInt(id) },
            data: { placa, chassi, renavam, modelo, marca, ano }
        });
        res.json(updatedVehicle);
    } catch (error) {
        console.error('Erro ao atualizar veículo:', error);
        res.status(500).json({ error: "Erro ao atualizar veículo" });
    }
});

// Rota para obter um carro específico pelo ID
app.get('/vehicles/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const vehicle = await prisma.vehicle.findUnique({
            where: { id: parseInt(id) },
        });

        if (!vehicle) {
            return res.status(404).json({ error: 'Veículo não encontrado' });
        }

        res.json(vehicle);
    } catch (error) {
        console.error('Erro ao buscar veículo:', error);
        res.status(500).json({ error: "Erro interno ao buscar veículo" });
    }
});

// Rota para excluir um veiculo
app.delete('/vehicles/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.vehicle.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao excluir veículo:', error);
        res.status(500).json({ error: "Erro ao excluir veículo" });
    }
});

// Iniciar o servidor e exporta
const server = app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

export { app, server };
