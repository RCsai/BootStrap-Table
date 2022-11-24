$('#testTable').bootstrapTable({
    url: '/getUser',            // 数据请求后台

    method: 'get',              //请求方式

    striped:true,               //是否显示行间隔色

    pagination:true,            //是否显示分页（*）

    sidePagination: "client",   //分页方式：client客户端分页，server服务端分页（*）

    paginationPreText:'<',              //上一页按钮样式

    paginationNextText:'>',             //下一页按钮样式

    pageNumber: 1,                       //初始化加载第一页，默认第一页

    pageSize: 15,                       //每页的记录行数（*）

    pageList: [10,15,"All"],        //可供选择的每页的行数（*）

    contentType: "application/x-www-form-urlencoded",   //重要选项,必填

    showColumns: false,                  //是否显示所有的列

    showRefresh: true,                  //是否显示刷新按钮

    showToggle: false,                    //是否显示详细视图和列表视图的切换按钮

    cardView: false,                    //是否显示详细视图

    detailView: false,                   //是否显示父子表

    search:true,                        //搜索框

    searchOnEnterKey:true,               //回车后执行搜索

    searchAlign:"right",                 //搜索框位置

    strictSearch:true,                  //完全匹配

    minimumCountColumns: 2,

    // clickToSelect:true,

    // maintainSelected:true,

    maintainSelected: true,

    //是否导出数据
    showExport: true,

    toolbar:"#toolbar",
    Icons : 'glyphicon-export icon-share',
    //选择导出数据的范围，默认basic：只导出当前页的表格数据；all：导出所有数据；selected：导出选中的数据
    exportDataType: "basic",
    //导出文件类型,因为导出png文件时会出现忽略的列也显示；导出PDF文件出现中文乱码的问题，所以根据需要只支持Excel文件类型即可
    //['json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'pdf']
    exportTypes: ['csv','excel'],
    // Icons:'glyphicon-export',
    // export: 'glyphicon-export icon-share',
    //导出设置
    exportOptions: {
        ignoreColumn: [0,4],  //忽略某一列的索引
        worksheetName: 'sheet1',  //表格工作区名称
        // tableName: '总台帐报表',
        //导出文件的名称
        fileName: 'test',
        onCellHtmlData:DoOnCellHtmlData
    },

    columns: [{
        // field :"checked",
        checkbox: true,  //是否显示复选框
    },{
        field: 'userId',
        title: 'ID'
    }, {
        field: 'password',
        title: '密码'
    },{
        field: 'Tel',
        title: '电话号码'
    },{
        field:'ID',
        title: '操作',
        width: 120,
        align: 'center',
        valign: 'middle',
        formatter: actionFormatter
    }],

    rowStyle: function (row, index) {

        // var classesArr = ['success', 'info'];
        var classesArr = [
            {css:{"background-color":'#eaf6f6'}},
            {css:{"background-color":'#c7f5fe'}}
        ];

        var strclass = "";

        if (index % 2 === 0) {//偶数行

            strclass = classesArr[0];

        } else {//奇数行

            strclass = classesArr[1];

        }
        return strclass;

    },//隔行变色
});
function Edit(userId,password,Tel){
    $("#userId").val(userId);
    $("#password").val(password);
    $("#Tel").val(Tel);
}

function Delete(userId){
    // alert(userId);
    var data_json={};
    data_json["userId"]=userId;

    $.ajax({
        type:"GET",
        url:"/deleteUser",
        data:data_json,
        dataType:"json",
        success:function (data){
            alert(data.msg);
            $("#testTable").bootstrapTable("refresh",{url:"/getUser"});
        },
        error:function (){
            alert("删除失败");
        }
    })
}

function DoOnCellHtmlData(cell, row, col, data) {
    // var result = "";
    // if (typeof data != 'undefined' && data != "") {
    //     var html = $.parseHTML(data);
    //
    //     $.each( html, function() {
    //         if ( typeof $(this).html() === 'undefined' )
    //             result += $(this).text();
    //         else if ( typeof $(this).attr('class') === 'undefined' || $(this).hasClass('th-inner') === true )
    //             result += $(this).html();
    //     });
    // }
    return data;
}


//操作栏的格式化
function actionFormatter(value, row, index) {
    var id = value;
    var result = "";
    // result += '<a href="javascript:;" class="btn btn-xs btn-success" style="margin:5px" onclick="EditViewById(\'undefined\', view=\'view\')" title="查看">';
    // result += '<span class="glyphicon glyphicon-search"></span></a>';
    result += '<a class="btn btn-xs btn-info" style="margin:5px" data-toggle="modal" data-target="#edit_user" onclick="Edit(\''+row.userId+'\',\''+row.password+'\',\''+row.Tel+'\')" title="编辑">';
    result += '<span class="glyphicon glyphicon-pencil"></span></a>';
    result += '<a class="btn btn-xs btn-danger"  style="margin:5px" onclick="Delete(\''+row.userId+'\')" title="删除">';
    result += '<span class="glyphicon glyphicon-remove"></span></a>';
    return result;
}


