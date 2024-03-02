let windowHeight;
let windowWidth;

uni.getSystemInfo({
    success:function (result){
        windowHeight=result.windowHeight;
        windowWidth=result.windowWidth;
    }
})

export {windowHeight,windowWidth}
