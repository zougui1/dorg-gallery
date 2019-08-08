const { Image } = require('../Models/Image');

const imagePerPage = 30;

const imageController = {

  add: ({ link, thumb, canvas, tags, nsfw, artist, characterName, user, description }) => {
    debug.mongoose('%o has been called', 'imageController.add');

    const image = new Image({
      link: link,
      thumb: thumb,
      canvas: {
        draw: canvas.draw,
        text: canvas.text,
      },
      tags: tags.map(t => t._id),
      nsfw: nsfw,
      artist: {
        name: artist.name,
        link: artist.link,
      },
      characterName: characterName,
      user: user._id,
      description: description,
    });

    return image.save();
  },

  getByPage: ({ tags, page, property }) => {
    debug.mongoose('%o has been called', 'imageController.getByPage');

    tags = tags.length > 0 ? tags : ['*'];
    const inTags = { $in: tags };
    let query;

    if (tags.length === 1 && tags[0] === '*') {
      query = Image.find({
        property: { $in: property },
        $and: [
          { $or: [
            { 'tags.$[].name': inTags },
            { 'user.name': inTags },
            { 'artist.name': inTags },
            { 'artist.link': inTags },
            { 'characterName': inTags },
          ]},
          { $or: [
            { 'user.name': inTags },
            { 'tags.$[].name': inTags },
            { 'artist.name': inTags },
            { 'artist.link': inTags },
            { 'characterName': inTags },
          ]},
          { $or: [
            { 'artist.name': inTags },
            { 'user.name': inTags },
            { 'tags.$[].name': inTags },
            { 'artist.link': inTags },
            { 'characterName': inTags },
          ]},
          { $or: [
            { 'artist.link': inTags },
            { 'artist.name': inTags },
            { 'user.name': inTags },
            { 'tags.$[].name': inTags },
            { 'characterName': inTags },
          ]},
          { $or: [
            { 'characterName': inTags },
            { 'artist.link': inTags },
            { 'artist.name': inTags },
            { 'user.name': inTags },
            { 'tags.$[].name': inTags },
          ]},
          { $or: [
            { 'characterName': inTags },
            { 'artist.link': inTags },
            { 'artist.name': inTags },
            { 'user.name': inTags },
            { 'tags.$[].name': inTags },
          ]},
        ]
      });
    } else {
      query = Image.find();
    }

    return query
      .skip((page - 1) * imagePerPage)
      .limit(imagePerPage)
      .populate('user', 'name')
      .sort({ _id: -1 });
  },

  getByUserAndTags: ({ user, tags, page }) => {
    debug.mongoose('%o has been called', 'imageController.getByUserAndTags');

    tags = tags.length > 0 ? tags : ['*'];

    return Image
      .find({ 'user.name': user.name, 'tags.$[].name': { $in: tags } })
      .skip((page - 1) * imagePerPage)
      .limit(imagePerPage)
      .populate('user', 'name')
      .sort({ _id: -1 });
  },

  getByUser: ({ user, page }) => {
    debug.mongoose('%o has been called', 'imageController.getByUser');

    return Image
      .find({ 'user.name': user.name })
      .skip((page - 1) * imagePerPage)
      .limit(imagePerPage)
      .populate('user', 'name')
      .sort({ _id: -1 });
  },

  getById: id => {
    debug.mongoose('%o has been called', 'imageController.getById');

    return Image.findById(id).populate('user', 'name');
  },

  getCount: ({ user, tags }) => {
    debug.mongoose('%o has been called', 'imageController.getCount');

    tags = tags.length > 0 ? tags : ['*'];

    return Image.countDocuments({ 'user.name': user.name, 'tags.$[].name': { $in: tags } });
  },

};

module.exports = imageController;
