import React, {Fragment} from 'react';
import styles from './style.scss';
import PropTypes from 'prop-types';
import { FaMinusSquare, FaPlusSquare, FaImage, FaFilePdf, FaFilePowerpoint,
    FaFileExcel, FaFileWord, FaRegFileAlt, FaVideo, FaRegFileAudio, FaRegFileArchive } from 'react-icons/fa';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
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

import audioImg from "./images/audio.png";
import excelImg from "./images/excel.png";
import fileImg from "./images/file.png";
import pdfImg from "./images/pdf.png";
import pptImg from "./images/ppt.png";
import rarImg from "./images/rar.png";
import textImg from "./images/text.png";
import videoImg from "./images/video.png";
import wordImg from "./images/word.png";

export default class ObjectLogger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalStatus: false,
            imageSrc: '',
            logToggleStatus: {}
        };
        this.attachmentList = [
            {type: "image", image: "", icon: '<FaImage />'},
            {type: "audio", image: audioImg, icon: '<FaRegFileAudio />'},
            {type: "excel", image: excelImg, icon: '<FaFileExcel />'},
            {type:"files", image: fileImg, icon: '<FaRegFileAlt />'},
            {type:"pdf", image: pdfImg, icon: '<FaFilePdf />'},
            {type:"ppt", image: pptImg, icon: '<FaFilePowerpoint />'},
            {type:"rar", image: rarImg, icon: '<FaRegFileArchive />'},
            {type:"text", image: textImg, icon: '<FaRegFileAlt />'},
            {type:"video", image: videoImg, icon: '<FaVideo />'},
            {type: "word", image: wordImg, icon: '<FaFileWord />'}];
    }

    static propTypes = {
        // 标题
        title: PropTypes.string,
        // 变更记录列表
        logList: PropTypes.array,
        // 语言设置
        lang: PropTypes.string,
        fileUrl: PropTypes.string,
        attachmentStyle: PropTypes.string
    };

    static defaultProps = {
        title: '',
        logList: [],
        lang: 'en',
        fileUrl: '',
        attachmentStyle: 'origin'
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
        } else if (contentType.indexOf('audio') === 0) {
            return 'audio';
        } else if (contentType.indexOf('text') === 0) {
            return 'text';
        } else if (contentType.indexOf('application/pdf') === 0) {
            return 'pdf';
        }

        return null;
    }

    judgeBySuffix(suffix) {
        if (suffix === 'rar' || suffix === 'zip' || suffix === 'war' 
        || suffix === 'tar' || suffix === 'jar' || suffix === '7z') {
            return 'rar';
        } else if (suffix === 'xlsx' || suffix === 'xls') {
            return 'excel';
        } else if (suffix === 'docx' || suffix === 'doc') {
            return 'word';
        } else if (suffix === 'pptx' || suffix === 'ppt') {
            return 'ppt';
        }

        return 'file';
    }

    // 下载日志中的文件附件
    downloadFile(file) {
        window.open(file.src);
    }

    toggleLog(id, status) {
        const newStatueMap = cloneDeep(this.state.logToggleStatus);

        newStatueMap[id] = status;
        this.setState({logToggleStatus: newStatueMap});
    }

    showPic(src) {
        this.setState({imageSrc: src, modalStatus: true});
    }

    closeModal() {
        this.setState({imageSrc: '', modalStatus: false});
    }

    genAttachmentBlock(file) {
        const { attachmentStyle, fileUrl } = this.props;
        let block = "";

        for(let i=0; i< this.attachmentList.length; i++) {
            let attachment = this.attachmentList[i];

            if (file.type === attachment.type) {
                block = (
                    <div className={styles.attachmentWrapper}
                         key={`attachment-${i}`}>
                        <div className={styles.fileItem}
                             title={attachment.type === 'image' ? 'click to show' : 'download'}>
                            {
                                attachmentStyle === 'icon' ?
                                    <span><span className={styles.fileIcon}>{attachment.icon}</span> {file.name}</span> :
                                    <div className={styles.attachment}
                                         onClick={() => {fileUrl ? (attachment.type === 'image' ? this.showPic(file.src) : this.downloadFile(file)) : {}} }>
                                        <img className={styles.img}
                                             src={attachment.type === 'image' ? file.src : attachment.image} alt={attachment.type}/>
                                        <div className={styles.imgTitle}>{file.name}</div>
                                    </div>
                            }
                        </div>
                    </div>
                );
                break;
            }
        }

        return block;
    }

    renderAttachment(file, index) {
        return (
            <div className={styles.fileListWrapper}
                 key={index}>
                <div className={styles.content}>
                    {
                        this.genAttachmentBlock(file)
                    }
                </div>
            </div>
        );
    }

    render() {
        const { logToggleStatus, modalStatus, imageSrc } = this.state;
        const { title, logList, lang, fileUrl } = this.props;
        let messages = {};
        messages['en'] = en_US;
        messages['zh'] = zh_CN;

        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <Fragment>
                    {/*标题*/}
                    <div className={styles.logTitle}>
                        { title ? title : <FormattedMessage id="logHistory" />}
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
                                                    let diffValue =
                                                        (attr.diffValue && attr.attributeType === 'RICHTEXT') ? JSON.parse(attr.diffValue) : {};

                                                    return (
                                                        <div className={styles.attrArea} key={index}>
                                                            <div className={styles.diffTextArea}>
                                                                <FormattedMessage id="update" />
                                                                <div className={styles.attributeName}>
                                                                    {attr.attributeName}
                                                                </div>
                                                                <div style={this.genDisplayStyle(attr.attributeType === 'RICHTEXT')}>
                                                                    , <FormattedMessage id="version" />: {diffValue.version},  <FormattedMessage id="difference" />：
                                                                </div>
                                                                <div style={this.genDisplayStyle(attr.attributeType !== 'RICHTEXT' && attr.attributeType !== 'ATTACHMENT')}>
                                                                    , <FormattedMessage id="oldValue" />"{attr.oldValue}"，<FormattedMessage id="newValue" />"{attr.newValue}"
                                                                </div>
                                                            </div>
                                                            <div style={this.genDisplayStyle(attr.attributeType === 'RICHTEXT')} className={styles.diff}>
                                                                {
                                                                    diffValue && diffValue.content && diffValue.content.map((line, index) => {
                                                                        return (
                                                                            <div key={`line-${index}`}>
                                                                                {
                                                                                    line.partList && line.partList.map((part, index) => {
                                                                                        return (
                                                                                            <div className={styles.changePart} key={`text-${index}`}>
                                                                                                <div className={`${styles.lineNumber} ${part.partType === 'CHANGE_OLD' ? styles.lineDel : styles.lineAdd}`}>
                                                                                                    {line.lineNumber}
                                                                                                </div>
                                                                                                <div className={`${styles.changeText} ${part.partType === 'CHANGE_OLD' ? styles.lineDel : styles.lineAdd}`}>
                                                                                                    {part.partType === 'CHANGE_OLD' ? '-' : '+'}&nbsp;&nbsp;&nbsp; {part.partContent}
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        );
                                                                    })
                                                                }

                                                            </div>
                                                            <div className={styles.attachmentContent} style={this.genDisplayStyle(attr.attributeType === 'ATTACHMENT')}>
                                                                <div className={styles.fileTitle}
                                                                     style={this.genDisplayStyle(attr.diffValue && attr.diffValue.add && attr.diffValue.add.length > 0)}>
                                                                    <FormattedMessage id="addedAttachment" />：</div>
                                                                <div className={styles.logFileWrapper}>
                                                                    {
                                                                        attr.diffValue && attr.diffValue.add && attr.diffValue.add.map((file, index) => {

                                                                            file = {
                                                                                src: `${fileUrl}/${file.fileId}`,
                                                                                name: file.fileName,
                                                                                fileId: file.fileId,
                                                                                type: this.judgeType(file.contentType, file.fileType)
                                                                            };

                                                                            return (
                                                                               this.renderAttachment(file, index)
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                                <div className={styles.fileTitle}
                                                                     style={this.genDisplayStyle(attr.diffValue && attr.diffValue.del && attr.diffValue.del.length > 0)}>
                                                                    <FormattedMessage id="deletedAttachment" />：</div>
                                                                <div className={styles.logFileWrapper}>
                                                                    {
                                                                        attr.diffValue && attr.diffValue.del && attr.diffValue.del.map((file, index) => {
                                                                            file = {
                                                                                src: `${fileUrl}/${file.fileId}`,
                                                                                name: file.fileName,
                                                                                fileId: file.fileId,
                                                                                type: this.judgeType(file.contentType, file.fileType)
                                                                            };

                                                                            return (
                                                                                this.renderAttachment(file, index)
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
