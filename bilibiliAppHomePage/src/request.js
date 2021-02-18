axios.defaults.baseURL = 'https://developer.duyiedu.com/vue/bz';
axios.interceptors.response.use(response => {
    // 对响应数据做点什么
    const { status } = response;
    const { url } = response.config;
    if (status === 200) {
        if (url === '/video') {
            return {
                count: response.data.count,
                data: response.data.data
            }
        }
        return response.data.data
    }
    return response;
})