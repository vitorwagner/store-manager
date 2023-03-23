const chai = require("chai");
const sinon = require("sinon");

chai.use(require("chai-as-promised"));
chai.use(require("sinon-chai"));

const { expect } = chai;

const SalesController = require("../../../src/controllers/sales.controller");
const SalesService = require("../../../src/services/sales.services");
const SalesModel = require("../../../src/models/sales.model");

const salesMock = [
  {
    saleId: 1,
    date: "2023-03-23T21:45:00.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2023-03-23T21:45:00.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2023-03-23T21:45:00.000Z",
    productId: 3,
    quantity: 15,
  },
];

describe("testa a camada Controller para Sales", () => {
  describe("testa se getAllSales", () => {
    it("retorna todas as vendas", async () => {
      const request = {};
      const response = {};
      sinon.stub(SalesService, "getAllSales").resolves(salesMock);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      const sales = await SalesController.getAllSales(request, response);

      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(salesMock);
    });
  });

  describe("testa se getSaleById", () => {
    it("retorna uma venda pelo id", async () => {
      const [saleMock] = salesMock;
      const request = { params: { id: 1 } };
      const response = {};

      sinon
        .stub(SalesService, "getSalesById")
        .resolves({ type: null, message: saleMock });

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await SalesController.getSaleById(request, response);

      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWith(saleMock);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
}
);