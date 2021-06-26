const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:123@cluster0.pzlm6.mongodb.net/pms?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false,

});