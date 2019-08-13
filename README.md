![NPM](https://img.shields.io/npm/l/react-object-logger.svg?style=popout) ![npm](https://img.shields.io/npm/v/react-object-logger.svg?style=flat-square)
## react-object-logger

这是一个对象属性变更历史展示的组件，查看[demo](https://promise-coding.github.io/react-object-logger/)

![demo](./image/ch.png)

# 配合使用
该组件配合对象日志变更工具[ObjectLogger](https://github.com/yeecode/ObjectLogger)使用，用以展示对象的变更日志。

# 如何使用
1、下载组件  
`npm install react-object-logger`   
2、应用组件  
`import ObjectLogger from 'react-object-logger';`    
`import 'react-object-logger/lib/css/styles.css';`    
3、使用  
`<ObjectLogger logList={logList} lang="zh" fileUrl="http://localhost:9527/file" />`  
注意：  
`this.logList`格式及具体字段含义请参考[ObjectLogger](https://github.com/yeecode/ObjectLogger)：  
也可以在本项目示例文件夹下进行对照参考：https://github.com/promise-coding/react-object-logger/tree/master/example/src   

# 参数配置
- `title`：为日志展示的标题，默认为“变更记录”，可自定义覆盖默认值；  
- `logList`；日志列表，数组类型；   
-  `lang`：显示语言，目前支持英文和中文，lang="en"为英文展示，lang="zh"为中文展示，默认是英文；  
-  `fileUrl`：如果修改的是文件类型，日志中展示源文件，需要一个文件存储的url，用于下载(可不设)；  
-  `attachmentStyle`: 修改的附件显示样式，默认是`origin`,也就是示例图所示的样子，大图标显示；当值为`icon`时，附件的图标展示位icon；  
其他配置项正在更新中...   

附：
logList数据样例  
```
[
    {
        "id": 4,
        "appName": "ObjectLoggerDemo",
        "objectName": "CleanRoomTask",
        "objectId": 5,
        "operator": "Tom",
        "operationName": "add",
        "operationAlias": "Add New Task",
        "extraWords": "Create a cleanRoomTask",
        "comment": "taskName is :Demo Task",
        "operationTime": "2019-07-04T07:52:02.000+0000",
        "attributeModelList": []
    },
    {
        "id": 5,
        "appName": "ObjectLoggerDemo",
        "objectName": "CleanRoomTask",
        "objectId": 5,
        "operator": "Tom",
        "operationName": "add",
        "operationAlias": "Add New Task",
        "extraWords": "Create a cleanRoomTask",
        "comment": "taskName is :Demo Task",
        "operationTime": "2019-07-04T07:52:02.000+0000",
        "attributeModelList": [
            {
                "attributeType": "RICHTEXT",
                "attributeName": "description",
                "attributeAlias": "Description",
                "oldValue": "<p>What is poetry? Who knows<br>Not a rose, but the scent of the rose.<br>Not the sky, but the light of the sky.</p><p><span style=\"font-weight: bold;\">Hi~</span></p><p>Not the fly, but the gleam of the fly.<br>Not the sea, but the sound of sea .</p><p><br></p><p><br>Not myself, but what makes us .<br>See you,hear and feel something that prose<br>Cannot: and what it is who knows.</p><h2>yes!</h2><p><br></p><p><br></p><p>that is the end</p>",
                "newValue": "<p>What is poetry? Who knows<br>Not a rose, but the scent of the rose.<br><p>add some words</p>Not the sky, but the light of the sky.</p><p><span style=\"font-weight: bold;\">Hi~ this is demo</span></p><p>Not the fly, but the gleam of the fly.<br>Not the sea, but the sound of sea .</p><p><br></p><p><br>Not myself, but what makes me .<br>See ,hear and feel something that prose<br>Cannot: and what it is who knows.</p><h2>yes!</h2>",
                "diffValue": "{\"version\":\"1.0.0\",\"content\":[{\"lineNumber\":1,\"partList\":[{\"partType\":\"CHANGE_OLD\",\"partContent\":\"What is poetry? Who knowsNot a rose, but the scent of the rose.Not the sky, but the light of the sky.\"},{\"partType\":\"CHANGE_NEW\",\"partContent\":\"What is poetry? Who knowsNot a rose, but the scent of the rose.\"},{\"partType\":\"CHANGE_NEW\",\"partContent\":\"add some words\"},{\"partType\":\"CHANGE_NEW\",\"partContent\":\"Not the sky, but the light of the sky.\"}]},{\"lineNumber\":3,\"partList\":[{\"partType\":\"CHANGE_OLD\",\"partContent\":\"Not myself, but what makes us .See you,hear and feel something that proseCannot: and what it is who knows.\"},{\"partType\":\"CHANGE_NEW\",\"partContent\":\"Not myself, but what makes me .See ,hear and feel something that proseCannot: and what it is who knows.\"}]},{\"lineNumber\":5,\"partList\":[{\"partType\":\"DEL\",\"partContent\":\"that is the end\"}]}]}",
                "id": 103,
                "operationId": 50
            }
        ]
    },
    {
        "id": 9,
        "appName": "ObjectLoggerDemo",
        "objectName": "CleanRoomTask",
        "objectId": 5,
        "operator": "Tom",
        "operationName": "update",
        "operationAlias": "Update a Task",
        "extraWords": null,
        "comment": null,
        "operationTime": "2019-07-04T08:15:50.000+0000",
        "attributeModelList": [
            {
                "attributeType": "NORMAL",
                "attributeName": "roomNumber",
                "attributeAlias": "roomNumber",
                "oldValue": "",
                "newValue": "702",
                "diffValue": null,
                "id": 11,
                "operationId": 9
            },
            {
                "attributeType": "NORMAL",
                "attributeName": "address",
                "attributeAlias": "address",
                "oldValue": "",
                "newValue": "Sunny Street",
                "diffValue": null,
                "id": 12,
                "operationId": 9
            },
            {
                "attributeType": "NORMAL",
                "attributeName": "status",
                "attributeAlias": "Status",
                "oldValue": "TODO",
                "newValue": "DOING",
                "diffValue": null,
                "id": 13,
                "operationId": 9
            },
            {
                "attributeType": "TEXT",
                "attributeName": "description",
                "attributeAlias": "Description",
                "oldValue": "Do something...",
                "newValue": "The main job is to clean the floor.",
                "diffValue": "Line 1<br/>&nbsp;&nbsp;&nbsp; -： <del> Do something... </del> <br/>&nbsp;&nbsp; +： <u> The main job is to clean the floor. </u> <br/>",
                "id": 14,
                "operationId": 9
            }
        ]
    },
    {
        "id": 11,
        "appName": "ObjectLoggerDemo",
        "objectName": "CleanRoomTask",
        "objectId": 5,
        "operator": "Jone",
        "operationName": "start",
        "operationAlias": "Start a Task",
        "extraWords": "Begin to clean room...",
        "comment": "Come on and start cleaning up.",
        "operationTime": "2019-07-04T08:16:02.000+0000",
        "attributeModelList": [
            {
                "attributeType": "NORMAL",
                "attributeName": "status",
                "attributeAlias": "Status",
                "oldValue": "TODO",
                "newValue": "DOING",
                "diffValue": null,
                "id": 15,
                "operationId": 11
            },{
                "id": 1135,
                "actionId": 3761,
                "attributeType": "ATTACHMENT",
                "attribute": "attachment",
                "attributeName": "attachment",
                "oldValue": null,
                "newValue": null,
                "diffValue": {del:[],add:[{belongTo:"ee",belongToStage:"ee",contentType:"application/pdf",fileId:"ee.DAT",fileName:"ee.pdf",fileSize:394411,fileType:"pdf",id:5474,isConfirmed:0,isDeleted:0,outerId:43170,uploadTime:1559788779000},
                        {belongTo:"ee",belongToStage:"ee",contentType:"video",fileId:"ee.DAT",fileName:"ee.mp4",fileSize:394411,fileType:"file",id:5474,isConfirmed:0,isDeleted:0,outerId:43170,uploadTime:1559788779000}]}
            },{
                "id": 1138,
                "actionId": 3766,
                "attributeType": "ATTACHMENT",
                "attribute": "attachment",
                "attributeName": "attachment",
                "oldValue": null,
                "newValue": null,
                "diffValue": {del:[],add:[{belongTo:"ee",belongToStage:"ee",contentType:"word",fileId:"ee.DAT",fileName:"u753.doc",fileSize:224098,fileType:"doc",id:5500,isConfirmed:0,isDeleted:0,outerId:43170,uploadTime:1560330531000}]}
            },{
                "id": 1042,
                "actionId": 3672,
                "attributeType": "ATTACHMENT",
                "attribute": "attachment",
                "attributeName": "attachment",
                "oldValue": null,
                "newValue": null,
                "diffValue": {del:[],add:[{belongTo:"ee",belongToStage:"ee",contentType:"pptx",fileId:"ee.DAT",fileName:"daxiong.pptx",fileSize:780831,fileType:"pptx",id:5471,isConfirmed:0,isDeleted:0,outerId:43170,uploadTime:1559532908000}]}
            },{
                "id": 1207,
                "actionId": 3965,
                "attributeType": "ATTACHMENT",
                "attribute": "attachment",
                "attributeName": "attachment",
                "oldValue": null,
                "newValue": null,
                "diffValue": {del:[{belongTo:"ee",belongToStage:"ee",contentType:"text",fileId:"ee.DAT",fileName:"rich.text",fileSize:780831,fileType:"text",id:5471,isConfirmed:1,isDeleted:0,outerId:43170,uploadTime:1559532910000}],add:[]}
            }
        ]
    }
]
```