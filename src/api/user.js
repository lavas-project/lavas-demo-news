import axios from 'axios';

export function getUserInfo(userId = '2459115') {
    // return axios('/api/user/getUserStatistics', {
    //     params: {
    //         userId
    //     }
    // });
    return new Promise(resolve => {
        resolve({
            errno: 0,
            data: {
                userName: 'Baidu',
                messageCount: 10
            }
        });
    });
};
