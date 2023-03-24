const chai = require("chai");
const sinon = require("sinon");

const { expect } = chai;

const SalesService = require("../../../src/services/sales.services");
const SalesModel = require("../../../src/models/sales.model");
const ProductsModel = require("../../../src/models/products.model");
const dataMock = require("../../Mocks/DataMock");

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

describe("testa se o service de sales", () => {
  describe("testa se getAllSales", () => {
    it("retorna todas as vendas", async () => {
      sinon.stub(SalesModel, "getAllSales").resolves(salesMock);

      const sales = await SalesService.getAllSales();

      expect(sales).to.be.deep.equal(salesMock);
    });
  });

  describe("testa se getSaleById", () => {
    it("retorna uma venda pelo id", async () => {
      const [saleMock] = salesMock;

      sinon.stub(SalesModel, "getSaleById").resolves(saleMock);

      const sale = await SalesService.getSalesById(1);

      expect(sale.message).to.be.deep.equal(saleMock);
    });

    it("retorna uma mensagem de erro quando não encontra uma venda com o id", async () => {
      sinon.stub(SalesModel, "getSaleById").resolves([]);

      const sale = await SalesService.getSalesById(1);

      expect(sale.message).to.be.deep.equal("Sale not found");
    });
  });

  describe("testa se postSaleProduct", () => {
    it("retorna uma mensagem de sucesso quando cria uma venda", async () => {
      sinon.stub(ProductsModel, "getProductById").resolves(1);

      sinon.stub(SalesModel, "postSale").resolves(1);

      sinon.stub(SalesModel, "postSaleProduct").resolves(1);

      const message = await SalesService.postSaleProduct(
        dataMock.rightSaleBody
      );

      expect(message).to.be.deep.equal({
        message: {
          id: 1,
          itemsSold: dataMock.rightSaleBody,
        },
      });
    });
  });



  describe("testa se deleteSaleProduct", () => {
    it("retorna a mensagem correta quando deleta uma venda", async () => {
      sinon.stub(SalesModel, "deleteSale").resolves(1);

      const message = await SalesService.deleteSaleProduct(1);

      expect(message).to.be.deep.equal({ type: null, message: null });
    });

    it("retorna uma mensagem de erro quando não encontra uma venda com o id", async () => {
      sinon.stub(SalesModel, "deleteSale").resolves(0);

      const message = await SalesService.deleteSaleProduct(1);

      expect(message).to.be.deep.equal({
        type: "NOT_FOUND",
        message: "Sale not found",
      });
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
