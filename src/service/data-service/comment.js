'use strict';

class CommentService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
    this._Comment = sequelize.models.Comment;
  }

  create(offerId, comment) {
    return this._Comment.create({
      offerId,
      ...comment,
    });
  }

  async drop(id) {
    const deletedRow = await this._Comment.destroy({
      where: {id}
    });

    return !!deletedRow;
  }

  findAll(offerId) {
    return this._Comment.findAll({
      where: {offerId},
      raw: true
    });
  }
}


module.exports = {
  CommentService,
};
