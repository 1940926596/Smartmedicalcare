import {createStore} from 'vuex'

export default createStore({
    state: {
        pageIndex:1,
        user:{
            old_id:'',
            old_name:'',
            old_age:'',
            old_gender:'',
            old_address:'',
            old_phone:'',
            old_create_time:'',
            old_uncomfortable_area:'',
            old_information_description:''
        },
        isLogin:false,
        chatIndex:0

    },
    getters: {},
    mutations: {
        setPageId:function (state,pageId){
            state.pageIndex=pageId;
        },
        setOld:function (state,old){
            state.user.old_id=old.oldId;
            state.user.old_name=old.oldName;
            state.user.old_age=old.oldAge;
            state.user.old_gender=old.oldGender;
            state.user.old_address=old.oldAddress;
            state.user.old_phone=old.oldPhone;
            state.user.old_create_time=old.oldCreateTime;
            state.user.old_uncomfortable_area=old.oldUncomfortableArea;
            state.user.old_information_description=old.oldInformationDescription;
        },
        setLogin:function (state,islogin){
            state.isLogin=islogin
        },
        setSex:function (state,sex){
            state.user.old_gender=sex
        },
        setChatIndex:function (state,chatIndex){
            state.chatIndex=chatIndex
        }

    },

    actions: {},
    modules: {}
})
