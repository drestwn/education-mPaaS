const {
  User,
  Product,
  Category,
  Images,
  sequelize,
} = require("../models/index");
const { comparePassword } = require("../helpers/encrypt");
const { signToken } = require("../helpers/jwt");
// const { sequelize } = require("../models/index");
class Controller {
  static async LoginAdmin(req, res, next) {
    try {
      console.log(req.body);
      const { email, password } = req.body;

      //ambil data user dari database dgn findOne dgn where username(1)
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "USER_NOT_FOUND" };
      }

      //compare password(2)
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "LOGIN_INVALID" };
      }

      //4 - access token jwt
      const accessToken = signToken({
        id: user.id,
        email: user.email,
      });
      let refreshToken = signToken({ id: user.id }, "secret", {
        expiresIn: "1h",
      });

      //(3)
      res.status(200).json({
        statusCode: 200,
        access_token: accessToken,
        refreshToken,
        email,
        id: user.id,
        role: user.role,
        message: "Login, let's roll",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async refreshAccessToken(req, res, next) {
    try {
      let { id } = req.idUser.id;

      let newAccessToken = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: "60000ms",
      });
      console.log("token refreshed");
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  }
  static async RegisterAdmin(req, res, next) {
    try {
      const { email, password, username, phoneNumber, address } = req.body;
      const created = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });
      res.status(201).json({
        statusCode: 201,
        data: created,
        message: "id, email has been created",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async renderProduct(req, res, next) {
    try {
      const response = await Product.findAll({
        include: [
          {
            model: Category,
          },
        ],
      });
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async renderCategory(req, res, next) {
    try {
      const response = await Category.findAll({});
      res.status(200).json({
        statusCode: 200,
        response,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const {
        name,
        slug,
        description,
        price,
        mainImg,
        categoryId,
        authorId,
        imgUrl,
      } = req.body;
      console.log(req.body, "dari frontend");
      if (categoryId === 0 || !categoryId) {
        throw { name: "DATANOTREADY" };
      }
      // console.log(sequelize);
      const result = await sequelize.transaction(async (t) => {
        const response = await Product.create(
          {
            name,
            slug: `Product-${name}`,
            description,
            price,
            mainImg,
            categoryId,
            authorId: req.idUser.id,
          },
          { transaction: t }
        );
        const createImage = await Images.create(
          {
            productId: response.id,
            imgUrl,
          },
          { transaction: t }
        );
        return { response, createImage };
      });

      res.status(200).json({
        statusCode: 200,
        // result,
        // createImage,
        msg: "product created successfully",
      });
    } catch (err) {
      // await t.rollback();
      console.log(err);
      next(err);
    }
  }
  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const response = await Category.create({
        name: name,
      });
      res.status(200).json({
        statusCode: 200,
        response,
        msg: "category created successfully",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteProductById(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Product.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        response,
        msg: "product deleted successfully",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async deleteCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Category.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        response,
        msg: "category deleted successfully",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async updateProductById(req, res, next) {
    try {
      const { id } = req.params;
      const { name, slug, description, price, mainImg, categoryId } = req.body;
      const response = await Product.update(
        {
          name,
          slug,
          description,
          price,
          mainImg,
          categoryId,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({
        statusCode: 200,
        response,
        msg: "product updated successfully",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async updateCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const response = await Category.update(
        { name: name },
        { where: { id: id } }
      );
      res.status(200).json({
        statusCode: 200,
        response,
        msg: "category updated successfully",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async RenderDetailProduct(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Product.findOne({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        response,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async RenderDetailCategory(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Category.findOne({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        response,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async renderAdmin(req, res, next) {
    try {
      const response = await User.findAll({});
      res.status(200).json({
        statusCode: 200,
        response,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async renderProductClient(req, res, next) {
    try {
      const response = await Product.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Images,
          },
        ],
      });
      res.status(200).json({
        statusCode: 200,
        response,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
