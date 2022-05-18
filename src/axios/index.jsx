import axios from "axios";
import { Modal } from "antd";
import '../style/loading.less';

export default {
    ajax(options) {
        let loading;
        if (options.data && options.isShowLoading !== false) {
            loading = document.getElementById("ajaxLoading");
            loading.style.display = "block";
        }
        return new Promise((resolve, reject) => {
            let baseURL = 'https://mock.mengxuegu.com/mock/627a603394a78564b3065ac8/danche';
            axios({
                baseURL: baseURL,
                url: options.url,
                method: 'GET',
                dataType: 'json',
                params: (options.data || options.data.params) || '',
                timeout: 5000
            }).then((response) => {
                // loading提示框
                if (options.data && options.isShowLoading !== false) {
                    loading = document.getElementById("ajaxLoading");
                    loading.style.display = "none";
                }
                if (response.status == 200) {
                    if (response.data.code == 0) {
                       // console.log("response",response)
                        resolve(response.data);
                    } else {
                        Modal.error({
                            title: "提示",
                            content: response.data.message
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })
    }
}