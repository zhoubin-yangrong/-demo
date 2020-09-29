(function(){
    // 第一步:服务器获取数据,绑定在页面中
    // 1.基于ajax获取数据,数据存储到Data中
    // 创建Ajax实例
    let DATA = null;
    let xhr = new XMLHttpRequest;
    // 打开一个请求连接,基于get请求和同步编程完成
    xhr.open('GET','json/product.json',false)
    // 监听服务器返回状态信息(http状态码为200,请求状态为4的时候拿到数据)
    xhr.onreadystatechange = function(){
        if (xhr.status === 200 && xhr.readyState ===4){
            // 基于responseText获取相应回来的信息
            DATA = xhr.responseText
        }
    }
    // 发送ajax请求
    xhr.send()
    // 把获取的json字符串转换成对象
    DATA = JSON.parse(DATA)
 
    // 2.把获取数据展示在页面当中
    // 根据获取的DATA    中有多少项,我就动态创建出多少个card盒子(项目中都是基于字符创拼接方式,把需要穿件的card评出来)
    let htmlStr = '';
    DATA.forEach((item)=>{
        // 基于解构赋值获取信息
        let {id=0,title,price,time,hot,img} = item;
        // 绑定自定义属性,添加数据信息     后期需要数据   直接拿取
        htmlStr += `<div class="card" 
                         data-price="${price}" 
                         data-hot="${hot}" 
                         data-time="${time}">
        <img src="${item.img}" class="card-img-top">
        <div class="card-body">
          <h6 class="card-title">${item.title}</h6>
          <p class="card-text">价格:${price}</p>
          <p class="card-text">好评:${hot}</p>
          <p class="card-text"><small>上架时间${time}</small> </p>
        </div>
      </div> `
    })
    // 拼接好的的字符串放入html中的card-deck容器中
    let cardDeck =document.querySelector('.card-deck')
    cardDeck.innerHTML = htmlStr

    //第二步点击价格  热热度    上架时间    可以按照升降序排列
    // 1箱操作谁先获取谁(三个排序按钮) 和所有card产品内容
    let navList = document.querySelectorAll('.navbar-nav li'),
    // 导航条li的类数组对象
        cardList = document.querySelectorAll('.card');
        // 卡片列表类数组对象
        console.log(navList)
        console.log(cardList)
// ------------------------用for循环写点击事件----------------------
    for(let i = 0;i<navList.length;i++){
            let item = navList[i]
            // 遍历每个导航项
        
            item['data-type']= -1
            console.dir(item)
            //导航标记自定义属性为 -1   控制升降序 
            item.onclick = function(){ 
                // 导航绑定点击事件 
                [].forEach.call(navList,item => (item ===this ? this['data-type'] *= -1 : item['data-type'] = -1))
                // 循环遍历导航类数组对象,箭头函数=>判断循环的每一项其中的一项是不是===当前this,如果是就*1   不是的话另外2项的自定义属性为-1
                cardList = [].slice.call(cardList,0)
                // 卡片列表类数组转为数组
                cardList.sort((next,cur)=>{
                    //数组排序   next代表下一项; cur代表当前项
                    let pai = this.getAttribute('data-pai')
                    //this代表当前被点击的navList的li  得到自定义属性data-pai的属性值
                    cur = cur.getAttribute(pai)
                    //cur变量就是cardList中排序需要用到的数据对比
                    next = next.getAttribute(pai)
                    if(pai ==='data-time'){
                        //时间去除-连接符    重新赋值
                        cur = cur.replace(/-/g,'')
                        next = next.replace(/-/g,'')
                    }
                    return (next - cur)*this['data-type']
                    // 这一步是为了判断1/-1  返回的结果为升序或者降序
                })
                cardList.forEach((item)=>cardDeck.appendChild(item))
                //循环卡片列表     每一项添加到cardDeck节点中    DOM映射机制
       
        }
    }
})()

// ---------------------------------------------------------------



//     //2先实现按照价格实现升降序排序
//     navList[1]['data-type'] = -1
//     //控制升降序开关做的自定义属性标记(1升序   -1 降序)
//     navList[1].onclick=function(){
//         this['data-type'] *= -1;
//         //类数组转换成数组   进行sort排序
//         cardList = Array.prototype.slice.call(cardList,0)   //  数组方法转移到cardList
//        //进行排序(按照每个产品的价格进行升序)
//        cardList.sort((next,cur)=>{
//             // next/cur存储的每个元素对象(此时我们需要的每个元素的价格,在数据绑定的时候,我们把价格等信息绑定奶在当前与手弩的某个自定义属性,此时我们需要的用时候,基于自定义属性方法获取到即可)
//         cur = cur.getAttribute('data-price');
//         next = next.getAttribute('data-price');
//         // return 1/-1决定升序还是降序
//         return (next - cur)*this['data-type'];
//         })
//         console.log(cardList)
//         cardList.forEach((item)=>{
//             cardDeck.appendChild(item)
//             // DOM的映射机制,因为排序改变堆内存属性的值的位置,因为映射机制存在,浏览器会帮我们把页面对应的这个元素标签从新按照最新样式渲染
//         })
//     }
// 

