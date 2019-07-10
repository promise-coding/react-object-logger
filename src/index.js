import React, {Fragment} from 'react';
import styles from './style.scss';
import PropTypes from 'prop-types';
import { FaMinusSquare, FaPlusSquare, FaImage, FaFilePdf,
    FaFileExcel, FaFileWord, FaRegFileAlt, FaVideo, FaRegFileAudio, FaRegFileArchive } from 'react-icons/fa';
import moment from 'moment';
import _ from 'lodash';
/* react-intl imports */
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
// 引入多语言环境的数据
addLocaleData([...en, ...zh]);

// import defined messages in Chinese
import zh_CN from "./locale/zh_CN"
// import defined messages in English
import en_US from "./locale/en_US"

export default class ObjectLogger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalStatus: false,
            imageSrc: '',
            logToggleStatus: {}
        };
    }

    static propTypes = {
        // 标题
        title: PropTypes.string,
        // 变更记录列表
        logList: PropTypes.array,
        // 语言设置
        lang: PropTypes.string
    };

    static defaultProps = {
        title: '变更记录',
        logList: [],
        lang: 'en'
    };

    genDisplayStyle(value) {
        return value ? {} : {display: 'none'};
    }

    componentWillMount() {
        const { logList } = this.props, toggleStatus = {};
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
        const { logToggleStatus, modalStatus, imageSrc } = this.state;
        const { title, logList, lang } = this.props;
        let messages = {};
        messages['en'] = en_US;
        messages['zh'] = zh_CN;

        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <Fragment>
                    {/*标题*/}
                    <div className={styles.logTitle}>
                        {<FormattedMessage id="logHistory" />}
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
                                            <FormattedMessage id="by" />
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
                                                                <FormattedMessage id="update" />
                                                                <div className={styles.attributeName}>
                                                                    {attr.attributeName}
                                                                </div>
                                                                <div style={this.genDisplayStyle(attr.attributeType === 'TEXT')}>
                                                                    , <FormattedMessage id="difference" />：
                                                                </div>
                                                                <div style={this.genDisplayStyle(attr.attributeType !== 'TEXT' && attr.attributeType !== 'ATTACHMENT')}>
                                                                    , <FormattedMessage id="oldValue" />"{attr.oldValue}"，<FormattedMessage id="newValue" />"{attr.newValue}"
                                                                </div>
                                                            </div>
                                                            <div style={this.genDisplayStyle(attr.attributeType === 'TEXT')}
                                                                 dangerouslySetInnerHTML={{__html: attr.diffValue}}>
                                                            </div>
                                                            <div className={styles.attachmentContent} style={this.genDisplayStyle(attr.attributeType === 'ATTACHMENT')}>
                                                                <div className={styles.fileTitle}
                                                                     style={this.genDisplayStyle(attr.diffValue && attr.diffValue.add && attr.diffValue.add.length > 0)}>
                                                                    <FormattedMessage id="addedAttachment" />：</div>
                                                                <div className={styles.logFileWrapper}>
                                                                    {
                                                                        attr.diffValue && attr.diffValue.add && attr.diffValue.add.map((file, index) => {

                                                                            file = {
                                                                                src: `http://localhost:9527/file/${file.fileId}`,
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
                                                                                src: `http://localhost:9527/file/${file.fileId}`,
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

            </IntlProvider>

        );
    }
}
