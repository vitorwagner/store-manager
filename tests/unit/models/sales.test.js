const chai = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/db/connection");

const { expect } = chai;

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

describe("testa a camada Model para Sales", () => {
  describe("testa se getAllSales", () => {
    it("retorna todas as vendas", async () => {
      sinon.stub(connection, "execute").resolves([salesMock]);

      const sales = await SalesModel.getAllSales();

      expect(sales).to.be.deep.equal(salesMock);
    });
  });
  describe("testa se getSaleById", () => {
    it("retorna uma venda pelo id", async () => {
      const [saleMock] = salesMock;
      sinon.stub(connection, "execute").resolves([saleMock]);

      const sale = await SalesModel.getSaleById(1);

      expect(sale).to.be.deep.equal(saleMock);
    });
  });

  describe("testa se postSale", () => {
    it("retorna um id de venda", async () => {
      const [saleMock] = salesMock;

      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

      const insertId = await SalesModel.postSale(saleMock);

      expect(insertId).to.be.deep.equal(1);
    });
  });

  describe("testa se postSaleProduct", () => {
    it("retorna um id de venda", async () => {
      const [saleMock] = salesMock;

      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

      const insertId = await SalesModel.postSaleProduct(
        saleMock.saleId,
        saleMock.productId,
        saleMock.quantity
      );

      expect(insertId).to.be.deep.equal(1);
    });
  });

  describe("testa se updateSaleProduct", () => {
    it("atualiza a venda", async () => {
      const [saleMock] = salesMock;

      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const affectedRows = await SalesModel.updateSaleProduct(
        saleMock.saleId,
        saleMock.productId,
        saleMock.quantity
      );

      expect(affectedRows).to.be.deep.equal(1);
    });
  });

  describe("testa se deleteSale", () => {
    it("deleta a venda pelo id", async () => {
      const [saleMock] = salesMock;

      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const affectedRows = await SalesModel.deleteSale(saleMock.saleId);

      expect(affectedRows).to.be.deep.equal(1);
    });
  });

  describe("testa se deleteSaleProduct", () => {
    it("deleta a venda pelo id", async () => {
      const [saleMock] = salesMock;

      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const affectedRows = await SalesModel.deleteSaleProduct(saleMock.saleId);

      expect(affectedRows).to.be.deep.equal(1);
    });
  });


  afterEach(() => {
    sinon.restore();
  });
});
