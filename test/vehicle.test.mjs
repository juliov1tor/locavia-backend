import { expect } from 'chai';
import request from 'supertest';
import { app } from '../server.mjs';


describe('CRUD Operations for Vehicles', () => {
    let vehicleId; 

    // Teste de Criação de veicuylo
    it('should create a new vehicle', async () => {
        const newVehicle = {
            placa: 'ABC1234',
            chassi: '1234567890',
            renavam: '987654321',
            modelo: 'Fusca',
            marca: 'Volkswagen',
            ano: 1999
        };

        const res = await request(app).post('/vehicles').send(newVehicle);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('placa').eql(newVehicle.placa);
        expect(res.body).to.have.property('chassi').eql(newVehicle.chassi);
        expect(res.body).to.have.property('renavam').eql(newVehicle.renavam);
        vehicleId = res.body.id; 
    });

    // Teste de Leitura de todos os veiculos
    it('should get all vehicles', async () => {
        const res = await request(app).get('/vehicles');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
    });

    // Teste de Leitura de um veiculo por Id
    it('should get a vehicle by id', async () => {
        const res = await request(app).get(`/vehicles/${vehicleId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id').eql(vehicleId);
    });

    // Teste de Atualização de Veiculo
    it('should update a vehicle by id', async () => {
        const updatedVehicle = {
            placa: 'XYZ5678',
            chassi: '0987654321',
            renavam: '123456789',
            modelo: 'Gol',
            marca: 'Volkswagen',
            ano: 2020
        };

        const res = await request(app).put(`/vehicles/${vehicleId}`).send(updatedVehicle);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('placa').eql(updatedVehicle.placa);
        expect(res.body).to.have.property('chassi').eql(updatedVehicle.chassi);
        expect(res.body).to.have.property('renavam').eql(updatedVehicle.renavam);
    });

    // Teste de exclusão de veículo 
    it('should delete a vehicle by id', async () => {
        const res = await request(app).delete(`/vehicles/${vehicleId}`);
        expect(res.status).to.equal(204);  
    });

    // Teste de leitura de um veículo que não existe 
    it('should return 404 for a non-existing vehicle', async () => {
        const res = await request(app).get('/vehicles/9999'); 
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error').eql('Veículo não encontrado');
    });

    // Teste de criação de veículo com dados duplicados
    it('should return an error when the placa is duplicated', async () => {
        const duplicateVehicle = {
            placa: 'ABC1234',
            chassi: '1122334455',
            renavam: '6677889900',
            modelo: 'Fusca',
            marca: 'Volkswagen',
            ano: 2000
        };

        const res = await request(app).post('/vehicles').send(duplicateVehicle);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error').eql('A placa já foi cadastrada.');
    });
});
