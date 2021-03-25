import postModel from '../model/post';
import postReactionModel from '../model/post_reactions'


module.exports = {

    async savePost(data) {
        try {
            const result = await postModel.create(data);
            return result;
        } catch (e) {
            console.log('an error occurred while saving a post', e); 
            return null;
            }
        },

    async getPost(param) {
        try {
            const userData = await postModel.find({ _id: param });
            const user = userData[0].toObject();
            return user;
        } catch (e) {
            console.log('an error occurred while getting a post', e);
        }
    },

    async updatePost(param, data) {
        try {
             const postData = await postModel.findByIdAndUpdate(data, param, {new: true});
             return postData;
        } catch (e) {
            console.log('an error occurred', e);
            if (e.name === 'MongoError' && e.code === 11000) {
                return false;
            }
            return e;
        }
    },

    async deletePost(param) {
        try {
            return await postModel.findOneAndDelete({ _id: param });
        } catch (e) {
            console.log('an error occurred while deleting a post', e);
        }
    },

    async addLike(data) {
        try {
            const result = await postReactionModel.create(data)
            return result;
        } catch (e) {
            console.log('an error occurred while liking a post', e); 
            return null;
            }
        },

    async removeLike(data) {
        try {
            const result = await postReactionModel.findOneAndDelete(data);
            return result;
        } catch (e) {
            console.log('an error occurred while unliking a post', e); 
            return null;
            }
        },

    async getOneData(model, data, param) {
        try {
            if (param) {
            const result = await model.findOne({ _id: data });
            return result
            }
            const result = await model.findOne(data);
            return result
        } catch (e) {
            return null;
        }
        },

    async getAllLikes(data) {
        try {
            return postReactionModel.find(data)
            .populate("user_id")
            .populate("post_id")
            .then((result) => {
                return result;
            })
        } catch (e) {
            return null;
        }
        },
};
