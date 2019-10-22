import {
  createPost,
  createComment,
  kudos,
  booo,
} from './mutation';
import {
  getPost,
  getKudosOfPost,
  getBoooOfPost,
} from './query';
import {
  author,
} from './author';
import {
  comment,
} from './comment';

module.exports = {
  createPost,
  createComment,
  getPost,
  getKudosOfPost,
  getBoooOfPost,
  author,
  comment,
  kudos,
  booo,
};
