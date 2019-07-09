import React, {Fragment} from 'react';
import styles from './style.scss';
import PropTypes from 'prop-types';
import { FaMinusSquare, FaPlusSquare, FaImage, FaFilePdf,
    FaFileExcel, FaFileWord, FaRegFileAlt, FaVideo, FaRegFileAudio, FaRegFileArchive } from 'react-icons/fa';
import moment from 'moment';
import _ from 'lodash';

export default class ObjectLogger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalStatus: false,
            imageSrc: '',
            logList: [
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
                            "attributeName": "附件",
                            "oldValue": null,
                            "newValue": null,
                            "diffValue": {del:[],add:[{belongTo:"ee",belongToStage:"ee",contentType:"application/pdf",fileId:"ee.DAT",fileName:"ee.pdf",fileSize:394411,fileType:"pdf",id:5474,isConfirmed:0,isDeleted:0,outerId:43170,uploadTime:1559788779000}]}
                        },{
                            "id": 1138,
                            "actionId": 3766,
                            "attributeType": "ATTACHMENT",
                            "attribute": "attachment",
                            "attributeName": "附件",
                            "oldValue": null,
                            "newValue": null,
                            "diffValue": {del:[],add:[{belongTo:"ee",belongToStage:"ee",contentType:"image/png",fileId:"ee.DAT",fileName:"u753.png",fileSize:224098,fileType:"png",id:5500,isConfirmed:0,isDeleted:0,outerId:43170,uploadTime:1560330531000}]}
                        },{
                            "id": 1042,
                            "actionId": 3672,
                            "attributeType": "ATTACHMENT",
                            "attribute": "attachment",
                            "attributeName": "附件",
                            "oldValue": null,
                            "newValue": null,
                            "diffValue": {del:[],add:[{belongTo:"ee",belongToStage:"ee",contentType:"image/jpeg",fileId:"ee.DAT",fileName:"Koala.jpg",fileSize:780831,fileType:"jpg",id:5471,isConfirmed:0,isDeleted:0,outerId:43170,uploadTime:1559532908000}]}
                        },{
                            "id": 1207,
                            "actionId": 3965,
                            "attributeType": "ATTACHMENT",
                            "attribute": "attachment",
                            "attributeName": "附件",
                            "oldValue": null,
                            "newValue": null,
                            "diffValue": {del:[{belongTo:"ee",belongToStage:"ee",contentType:"image/jpeg",fileId:"ee.DAT",fileName:"Koala.jpg",fileSize:780831,fileType:"jpg",id:5471,isConfirmed:1,isDeleted:0,outerId:43170,uploadTime:1559532910000}],add:[]}
                        }
                    ]
                }
            ],
            logToggleStatus: {}
        };
    }

    static propTypes = {
        // 标题
        title: PropTypes.string,
        // 变更记录列表
        logList: PropTypes.array,
    };

    static defaultProps = {
        title: '变更记录',
        logList: []
    };

    genDisplayStyle(value) {
        return value ? {} : {display: 'none'};
    }

    componentWillMount() {
        const { logList } = this.state, toggleStatus = {};
        logList.forEach((log) =>{
            toggleStatus[log.id] = false;
        });

        this.setState({logToggleStatus: toggleStatus});
    }

    judgeType(contentType, suffix) {
        const type = this.judgeByContentType(contentType);

        if (type) {
            return type;
        }

        return this.judgeBySuffix(suffix);
    }

    judgeByContentType(contentType) {
        if (contentType.indexOf('video') === 0) {
            return 'video';
        } else if (contentType.indexOf('image') === 0) {
            return 'image';
        } else if (contentType.indexOf('text') === 0) {
            return 'text';
        } else if (contentType.indexOf('application/pdf') === 0) {
            return 'pdf';
        }

        return null;
    }

    judgeBySuffix(suffix) {
        if (suffix === 'rar' || suffix === 'zip') {
            return 'rar';
        } else if (suffix === 'xlsx' || suffix === 'xls') {
            return 'excel';
        } else if (suffix === 'docx' || suffix === 'doc') {
            return 'word';
        }

        return 'file';
    }

    // 下载日志中的文件附件
    downloadFile(file) {
        window.open(file.src);
    }

    toggleLog(id, status) {
        const newStatueMap = _.cloneDeep(this.state.logToggleStatus);

        newStatueMap[id] = status;
        this.setState({logToggleStatus: newStatueMap});
    }

    showPic(src) {
        this.setState({imageSrc: src, modalStatus: true});
    }

    closeModal() {
        this.setState({imageSrc: '', modalStatus: false});
    }

    render() {
        const { logList, logToggleStatus, modalStatus, imageSrc } = this.state;
        const { title } = this.props;

        return (
            <Fragment>
                {/*标题*/}
                <div className={styles.logTitle}>
                    {title}
                </div>

                <div>
                    {
                        logList && logList.map((log, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className={styles.logInfo} key={log.id}>
                                        <span className={styles.logIndex}>
                                            {index +1}.&nbsp;&nbsp;
                                        </span>
                                        <span className={styles.logToggle}
                                              style={this.genDisplayStyle(log.attributeModelList && log.attributeModelList.length > 0 && !logToggleStatus[log.id])}
                                              onClick={() => this.toggleLog(log.id, true)}>
                                            <FaPlusSquare />
                                        </span>
                                        <span className={styles.logToggle}
                                              style={this.genDisplayStyle(log.attributeModelList && log.attributeModelList.length > 0 && logToggleStatus[log.id])}
                                              onClick={() => this.toggleLog(log.id, false)}>
                                            <FaMinusSquare />
                                        </span>
                                        <span>
                                            {moment(log.operationTime).format('YYYY-MM-DD HH:mm:ss')}
                                        </span>
                                        <span className={styles.logTime}>
                                            by
                                        </span>
                                        <span className={styles.operator}>
                                            {log.operator}
                                        </span>
                                        <span style={this.genDisplayStyle(!log.operationAlias)}
                                              className={styles.operationName}>
                                            {log.operationName}
                                        </span>
                                        <span style={this.genDisplayStyle(log.operationAlias)}
                                              className={styles.operationName}>
                                            {log.operationAlias}
                                        </span>
                                        <span className={styles.objectName}>
                                            "{log.objectName}"
                                        </span>
                                        <span className={styles.logExtra} style={this.genDisplayStyle(log.extraWords)}>
                                            {log.extraWords}
                                        </span>
                                        <div style={this.genDisplayStyle(log.comment)} className={styles.comment}>
                                            {log.comment}
                                        </div>
                                    </div>

                                    <div style={this.genDisplayStyle(log.attributeModelList.length > 0 && logToggleStatus[log.id])}
                                         className={styles.logAttr}>
                                        {
                                            log.attributeModelList && log.attributeModelList.map((attr, index) => {
                                                return (
                                                    <div className={styles.attrArea} key={index}>
                                                        <div className={styles.diffTextArea}>
                                                            <span>修改了</span>
                                                            <div className={styles.attributeName}>
                                                                {attr.attributeName}
                                                            </div>
                                                            <div style={this.genDisplayStyle(attr.attributeType === 'TEXT')}>
                                                                , 区别是：
                                                            </div>
                                                            <div style={this.genDisplayStyle(attr.attributeType !== 'TEXT' && attr.attributeType !== 'ATTACHMENT')}>
                                                                , 旧值为"{attr.oldValue}"，新值为"{attr.newValue}"
                                                            </div>
                                                        </div>
                                                        <div style={this.genDisplayStyle(attr.attributeType === 'TEXT')}
                                                             onClick={() => this.clickLogCommit($event)}
                                                             dangerouslySetInnerHTML={{__html: attr.diffValue}}>
                                                        </div>
                                                        <div className={styles.attachmentContent} style={this.genDisplayStyle(attr.attributeType === 'ATTACHMENT')}>
                                                            <div className={styles.fileTitle}
                                                                style={this.genDisplayStyle(attr.diffValue && attr.diffValue.add && attr.diffValue.add.length > 0)}>
                                                                新增的附件如下：</div>
                                                            <div className={styles.logFileWrapper}>
                                                                {
                                                                    attr.diffValue && attr.diffValue.add && attr.diffValue.add.map((file, index) => {

                                                                        file = {
                                                                            src: `http://99.47.148.71:9264/file/seed/${file.fileId}`,
                                                                            name: file.fileName,
                                                                            fileId: file.fileId,
                                                                            type: this.judgeType(file.contentType, file.fileType)
                                                                        };

                                                                        return (
                                                                            <div className={styles.fileListWrapper}
                                                                                key={index}>
                                                                                <div className={styles.content}>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'image')}>
                                                                                        <div className={styles.fileItem}
                                                                                             title="点击查看"
                                                                                             onClick={() => this.showPic(file.src)}>
                                                                                            <span className={styles.fileIcon}><FaImage /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'video')}>
                                                                                        <div className={styles.fileItem} title="音频文件">
                                                                                            <span className={styles.fileIcon}><FaVideo /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'text')}>
                                                                                        <div className={styles.file}
                                                                                             title="点击下载"
                                                                                             onClick={() => this.downloadFile(file)}>
                                                                                            <span className={styles.fileIcon}><FaRegFileAlt /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'pdf')}>
                                                                                        <div className={styles.file}
                                                                                             title="点击下载"
                                                                                             onClick={() => this.downloadFile(file)}>
                                                                                            <span className={styles.fileIcon}><FaFilePdf /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'rar')}>
                                                                                        <div className={styles.file}
                                                                                             title="点击下载"
                                                                                             onClick={() => this.downloadFile(file)}>
                                                                                            <span className={styles.fileIcon}><FaRegFileArchive /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'excel')}>
                                                                                        <div className={styles.file}
                                                                                             title="点击下载"
                                                                                             onClick={() => this.downloadFile(file)}>
                                                                                            <span className={styles.fileIcon}><FaFileExcel /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'word')}>
                                                                                        <div className={styles.file}
                                                                                             title="点击下载"
                                                                                             onClick={() => this.downloadFile(file)}>
                                                                                            <span className={styles.fileIcon}><FaFileWord /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'file')}>
                                                                                        <div className={styles.file}
                                                                                             title="点击下载"
                                                                                             onClick={() => this.downloadFile(file)}>
                                                                                            <span className={styles.fileIcon}><FaRegFileAlt /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            <div className={styles.fileTitle}
                                                                 style={this.genDisplayStyle(attr.diffValue && attr.diffValue.del && attr.diffValue.del.length > 0)}>
                                                                删除的附件如下：</div>
                                                            <div className={styles.logFileWrapper}>
                                                                {
                                                                    attr.diffValue && attr.diffValue.del && attr.diffValue.del.map((file, index) => {
                                                                        file = {
                                                                            src: `http://99.47.148.71:9264/file/seed/${file.fileId}`,
                                                                            name: file.fileName,
                                                                            fileId: file.fileId,
                                                                            type: this.judgeType(file.contentType, file.fileType)
                                                                        };

                                                                        return (
                                                                            <div key={index} className={styles.fileListWrapper}>
                                                                                <div className="content">
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'image')}>
                                                                                        <div className={styles.fileItem}
                                                                                             title="点击查看"
                                                                                             onClick={() => this.showPic(file.src)}>
                                                                                            <span className={styles.fileIcon}><FaImage /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'video')}>
                                                                                        <div className={styles.fileItem} title="音频文件">
                                                                                            <span className={styles.fileIcon}><FaVideo /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'text')}>
                                                                                        <div className={styles.file}
                                                                                             title="点击下载"
                                                                                             onClick={() => this.downloadFile(file)}>
                                                                                            <span className={styles.fileIcon}><FaRegFileAlt /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'pdf')}>
                                                                                        <div className={styles.file}
                                                                                             title="点击下载"
                                                                                             onClick={() => this.downloadFile(file)}>
                                                                                            <span className={styles.fileIcon}><FaFilePdf /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'rar')}>
                                                                                        <div className={styles.file}
                                                                                             title="点击下载"
                                                                                             onClick={() => this.downloadFile(file)}>
                                                                                            <span className={styles.fileIcon}><FaRegFileArchive /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'excel')}>
                                                                                        <div className={styles.file}
                                                                                             title="点击下载"
                                                                                             onClick={() => this.downloadFile(file)}>
                                                                                            <span className={styles.fileIcon}><FaFileExcel /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'word')}>
                                                                                        <div className={styles.file}
                                                                                             title="点击下载"
                                                                                             onClick={() => this.downloadFile(file)}>
                                                                                            <span className={styles.fileIcon}><FaFileWord /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.attachmentWrapper}
                                                                                         style={this.genDisplayStyle(file.type === 'file')}>
                                                                                        <div className={styles.file}
                                                                                             title="点击下载"
                                                                                             onClick={() => this.downloadFile(file)}>
                                                                                            <span className={styles.fileIcon}><FaRegFileAlt /></span> {file.name}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </Fragment>
                            )
                        })
                    }
                </div>

                <div className={styles.modalMask} style={modalStatus ? {display: 'block'} : {display: 'none'}}>
                    <div className={styles.modal}>
                        <img src={imageSrc} alt="图片"/>
                        <div onClick={() => this.closeModal()} className={styles.closeModal}>X</div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
