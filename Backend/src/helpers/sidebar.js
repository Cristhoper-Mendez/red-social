const Images = require('./images');
const Comments = require('./comments');
const Stats = require('./stats')

module.exports = async viewModel => {

    const results = await Promise.all([
        Images.popular(),
        Stats(),
        Comments.newest()
    ])

    viewModel.sidebar = {
        popular: results[0],
        stats: results[1],
        comments: results[2]
    };
    
    return viewModel;
}