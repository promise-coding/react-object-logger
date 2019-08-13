import React from 'react'
import { render } from 'react-dom'
import ObjectLogger from '../../src/index'

const logList = [
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
];

const App = () => <ObjectLogger logList={logList} lang="zh" attachmentStyle="origin"
                                fileUrl="" />;

render(<App />, document.getElementById('root'));
