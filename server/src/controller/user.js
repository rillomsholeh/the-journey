const { tb_user } = require("../../models");

exports.getUser = async (request, response) => {
  try {
    const { id } = request.params;
    let user = await tb_user.findOne({
      where: {
        id,
      },
    });
    response.send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
