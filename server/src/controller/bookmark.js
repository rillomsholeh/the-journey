const { tb_bookmark, tb_post, tb_user } = require("../../models");

exports.addBookmark = async (request, response) => {
  try {
    const addBookmark = await tb_bookmark.create({
      idUser: request.tb_user.id,
      idPost: request.body.idJourney,
    });

    response.send({
      status: "success",
      message: {
        addBookmark,
      },
    });
  } catch (error) {
    console.log(error);
    response.send({
      status: "server error",
    });
  }
};

exports.deleteBookmark = async (request, response) => {
  try {
    const id = request.params;
    await tb_bookmark.destroy({
      where: {
        id,
      },
    });

    response.send({
      status: "success",
      message: "delete bookmark success",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getBookmarkuser = async (request, response) => {
  try {
    const { id } = request.params;
    let data = await tb_bookmark.findAll({
      where: {
        idUser: id,
      },
      include: [
        {
          model: tb_post,
          as: "bookmark",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    data = JSON.parse(JSON.stringify(data));
    data = {
      ...data,
      // thumbnail: process.env.FILE_PATH + data.thumbnail,
    };

    response.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    response.send({
      message: "server error",
    });
  }
};
