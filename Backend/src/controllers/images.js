import { Image, Comment, Like } from "../models";
const ctrl = {};

ctrl.index = async (req, res) => {
  // Obtener parametros
  const _id = req.params.image_id;
  const user = req.user;

  try {
    const postDB = await Image.findOne({ _id });

    if (user != null) {
      const likeDB = await Like.findOne({ imgId: _id, userId: user._id });

      let liked;

      if (likeDB) {
        liked = likeDB.like;
      } else {
        liked = false;
      }

      postDB.views = postDB.views + 1;
      await postDB.save();

      const commentDB = await Comment.find({ imageId: _id });
      res.json({ postDB, commentDB, liked });
    } else {
      postDB.views = postDB.views + 1;
      await postDB.save();

      let liked = null;

      const commentDB = await Comment.find({ imageId: _id });
      res.json({ postDB, commentDB, liked });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

ctrl.createPost = async (req, res) => {
  const body = req.body;
  body.userId = req.user._id;

  //   console.log(req.user);

  try {
    const postDB = await Image.create(body);
    res.status(200).json(postDB);
    // console.log(postDB);
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

ctrl.like = async (req, res) => {
  const _id = req.params.image_id;
  const userId = req.user._id;

  const postDB = await Image.findOne({ _id });
  let likeDB = await Like.findOne({ imgId: _id, userId });
  try {
    if (!likeDB) {
      // Crear el nuevo like
      let like = {
        imgId: _id,
        userId,
        like: true,
      };

      // Guarda el like nuevo
      const likeDB = await Like.create(like);
      postDB.likes = postDB.likes + 1;
      await postDB.save();

      res.json({
        postDB,
        likeDB,
      });
    } else {
      if (likeDB.like === true) {
        //Cambiar el estado a false y guardar la data
        likeDB.like = false;
        await likeDB.save();

        //Restar un like a la publicacion y guardar los datos
        postDB.likes = postDB.likes - 1;
        await postDB.save();

        res.json({
          likeDB,
          postDB,
        });
      } else {
        // Cambiar el estado a true y guardar la data
        likeDB.like = true;
        await likeDB.save();

        // Sumar el like nuevo y guardar cambios
        postDB.likes = postDB.likes + 1;
        await postDB.save();

        res.json({
          likeDB,
          postDB,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

ctrl.comment = async (req, res) => {
  const _id = req.params.image_id;

  const body = req.body;

  body.userId = req.user._id;
  body.email = req.user.email;
  body.name = req.user.name;
  body.avatar = req.user.avatar;
  body.imageId = _id;

  try {
    // Verificar que la publicacion exista
    const postDB = await Image.findOne({ _id });

    if (postDB) {
      const commentDB = await Comment.create(body);
      res.json(commentDB);
    } else {
        res.status(404).json({
            message: 'No se encontro la publicacion'
        })
    }
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

ctrl.deleteImg = async (req, res) => {
  const _id = req.params.image_id;

  try {
    const postDB = await Image.findOne({ _id });

    // Verificar que es el creador de la publicacion
    if (req.user._id === postDB.userId) {
      await Comment.deleteOne({ imageId: postDB._id });
      await postDB.remove();
      res.json({ message: "deleted!" });
    } else {
      res.json({
        message: "No tienes permiso para esta accion",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

module.exports = ctrl;
