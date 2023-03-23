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
  }
  );
  describe("testa se getSaleById", () => {
    it("retorna uma venda pelo id", async () => {
      const [saleMock] = salesMock;
      sinon.stub(connection, "execute").resolves([saleMock]);

      const sale = await SalesModel.getSaleById(1);

      expect(sale).to.be.deep.equal(saleMock);
    });
  }
  );
  afterEach(() => {
  sinon.restore();
  }
  );
});
