const chai = require('chai');
const sinon = require('sinon');
const connection = require("../../../src/db/connection");

const { expect } = chai;

const ProductsModel = require('../../../src/models/products.model');

const productsMock = [[
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
]];

describe('testa a camada Model para Products', () => {
  describe('testa se getAllProducts', () => {
    it('retorna todos produtos', async () => {
      sinon.stub(connection, 'execute').resolves([productsMock]);

      const products = await ProductsModel.getAllProducts();

      expect(products).to.be.deep.equal(productsMock);
    });
  
    
  });
  describe('testa se getProductById', () => {
    it('retorna um produto pelo id', async () => {
      const [productMock] = productsMock;
      sinon.stub(connection, 'execute').resolves([productMock]);

      const product = await ProductsModel.getProductById(1);

      expect(product).to.be.deep.equal(productMock[0]);
    });
  });

  afterEach(() => {
    sinon.restore();
  }
  );
});

