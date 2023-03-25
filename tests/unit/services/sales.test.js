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

    it("retorna uma mensagem de erro quando não encontra um produto com o id", async () => {
      sinon.stub(ProductsModel, "getProductById").resolves(undefined);

      const message = await SalesService.postSaleProduct(
        dataMock.rightSaleBody
      );

      expect(message).to.be.deep.equal({
        type: "NOT_FOUND",
        message: "Product not found",
      });
    });

    it("retorna uma mensagem de erro quando a quantidade de produto é inválida", async () => {
      sinon.stub(ProductsModel, "getProductById").resolves(1);

      const message = await SalesService.postSaleProduct(
        dataMock.wrongZeroNegativeBody
      );

      expect(message).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
      });
    });

    it("retorna uma mensagem de erro quando o id do produto não é informado", async () => {
      const message = await SalesService.postSaleProduct(
        dataMock.wrongSaleNotProductIdBody
      );

      expect(message).to.be.deep.equal({
        type: "NAME_IS_REQUIRED",
        message: '"productId" is required',
      });
    });
  });

  describe("testa se updateSaleProduct", () => {
    it("retorna uma mensagem de sucesso quando atualiza uma venda", async () => {
      sinon.stub(ProductsModel, "getProductById").resolves(1);

      sinon.stub(SalesModel, "getSaleById").resolves(salesMock[0]);

      const message = await SalesService.updateSaleProduct(
        1,
        dataMock.rightSaleBody
      );

      expect(message).to.be.deep.equal({
        message: {
          saleId: 1,
          itemsUpdated: dataMock.rightSaleBody,
        },
      });
    });

    it("retorna uma mensagem de erro quando não encontra uma venda com o id", async () => {
      sinon.stub(ProductsModel, "getProductById").resolves(1);
      sinon.stub(SalesModel, "getSaleById").resolves([]);

      const message = await SalesService.updateSaleProduct(
        1,
        dataMock.rightSaleBody
      );

      expect(message).to.be.deep.equal({
        type: "NOT_FOUND",
        message: "Sale not found",
      });
    });

    it("retorna uma mensagem de erro quando não encontra um produto com o id", async () => {
      sinon.stub(ProductsModel, "getProductById").resolves(undefined);

      const message = await SalesService.updateSaleProduct(
        1,
        dataMock.nonexistentProductIdBody
      );

      expect(message).to.be.deep.equal({
        type: "NOT_FOUND",
        message: "Product not found",
      });
    });

    it("retorna uma mensagem de erro quando a quantidade de produto é inválida", async () => {
      sinon.stub(ProductsModel, "getProductById").resolves(1);

      const message = await SalesService.updateSaleProduct(
        1,
        dataMock.wrongZeroNegativeBody
      );

      expect(message).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
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

    it("retorna um erro quando o id da venda não é válido", async () => {
      sinon.stub(SalesModel, "deleteSale").resolves(0);

      const message = await SalesService.deleteSaleProduct("teste");

      expect(message).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '"id" must be a number',
      });
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
