const mongoose = require('mongoose');

const runningSchema = mongoose.Schema({
    avatar: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    pseudo: {
        type: String,
        unique: true,
        required: true
    },
    mail: {
        type: String,
        unique: true,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
    // size: {
    //     type: Number,
    //     required: true
    // },
    // weight: {
    //     weight: {
    //         type: Number,
    //         required: true
    //     },
    //     date_weight: {
    //         type: Date,
    //         required: true    
    //     }
    // },
    // point: {
    //     type: Number,
    //     required: true
    // },
    // km: {
    //     number_km: {
    //         type: String,
    //         required: true    
    //     },
    //     date_km: {
    //         type: Date,
    //         required: true    
    //     },
    //     total_km: {
    //         type: Number,
    //         required: true    
    //     }
    // },
    // circuit: {
    //     name: {
    //         type: String,
    //         required: true    
    //     },
    //     km: {
    //         type: Number,
    //         required: true    
    //     },
    //     date_circuit: {
    //         type: Date,
    //         required: true    
    //     }
    // }
})

module.exports = mongoose.model('RunningMap_model', runningSchema);