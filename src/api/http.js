import store from "../store";
import {getCurrentTime, getCurrentTimeAddOne} from "./utils";

const baseURL = "http://localhost:8080"

const getOldPeopleById = (old_id, index) => {
    uni.request({
        url: baseURL + "/oldPeople/getOldPeopleById?" + "oldPeopleId=" + old_id,
        success: function (res) {
            store.commit('setOld', res.data);
            store.commit('setLogin', true)
            if (index === 0) {
                store.commit("setPageId", 1)
            }
            if (index === 1) {
                store.commit("setPageId", 3)
            }
        },
        fail: function (res) {
            console.log(res)
        }
    })
}

const addOldPeople = (old_id) => {
    uni.request({
        method: "POST",
        url: baseURL + "/oldPeople/addOldPeople",
        data: {
            "oldId": old_id,
            "oldName": "微信用户" + old_id,
            "oldAge": 0,
            "oldGender": "男",
            "oldAddress": "",
            "oldPhone": "",
            "oldCreateTime": getCurrentTime(),
            "oldUncomfortableArea": "",
            "oldInformationDescription": ""
        },
        success: function (res) {
            store.commit('setOld', res.data);
            getOldPeopleById(old_id, 1)
            // store.commit('setPageId',1)
        },
        fail: function (res) {
            console.log(res)
        }
    })
}

const updatePeople = () => {
    uni.request({
        method: "POST",
        url: baseURL + "/oldPeople/updateOldPeopleById",
        data: {
            "oldId": store.state.user.old_id,
            "oldName": store.state.user.old_name,
            "oldAge": store.state.user.old_age,
            "oldGender": store.state.user.old_gender,
            "oldAddress": store.state.user.old_address,
            "oldPhone": store.state.user.old_phone,
            "oldCreateTime": store.state.user.old_create_time,
            "oldUncomfortableArea": store.state.user.old_uncomfortable_area,
            "oldInformationDescription": store.state.user.old_information_description
        },
        success: function (res) {
            console.log(res)
        },
        fail: function (res) {
            console.log(res)
        }
    })
}

const reserveDoctor = (deal_id, old_id, doctorId) => {
    uni.request({
        method: "POST",
        url: baseURL + "/deal/addDeal",
        data: {
            dealId: deal_id,
            dealOldId: old_id,
            dealDoctorId: doctorId,
            dealCreateTime: getCurrentTime(),
            dealEndTime: getCurrentTimeAddOne()
        },
        success: function (res) {
            console.log(res.data)
        },
        fail: function (res) {
            console.log(res)
        }
    })
}

const getReserveInfo = (old_id) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: "GET",
            url: baseURL + "/deal/getDealByOldId?oldId=" + old_id,
            success: function (res) {
                resolve(res.data)
            },
            fail: function (res) {
                console.log(res)
                reject("error")
            }
        })
    })
}

const getDoctorById = (doctor_id) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: "GET",
            url: baseURL + "/doctor/getDoctorById?doctorId=" + doctor_id,
            success: function (res) {
                resolve(res.data)
            },
            fail: function (res) {
                console.log(res)
                reject("error")
            }
        })
    })
}

const sendSocketMsg = (doctor_id, content) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: "POST",
            url: baseURL + "/websocket/sendMsg",
            data: {
                "send_id": store.state.user.old_id,
                "receiver_id": doctor_id,
                "content": content
            },
            success: function (res) {
                resolve(res.data)
            },
            fail: function (res) {
                console.log(res)
                reject("error")
            }
        })
    })
}

const getDominator = (dominatorId) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: "GET",
            url: baseURL + "/dominator/getDominatorById?dominatorId=" + dominatorId
        }).then((res) => {
            resolve(res.data)
        }).catch(() => {
            reject("error")
        })
    })
}

export {
    baseURL, getOldPeopleById, addOldPeople, updatePeople,
    reserveDoctor, getReserveInfo, getDoctorById, sendSocketMsg, getDominator
};
