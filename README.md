![NPM](https://img.shields.io/npm/l/react-object-logger.svg?style=popout) ![npm](https://img.shields.io/npm/v/react-object-logger.svg?style=flat-square)
## react-object-logger

这是一个对象属性变更历史展示的组件

# 配合使用
该组件配合对象日志变更工具[ObjectLogger](https://github.com/yeecode/ObjectLogger)使用，用以展示对象的变更日志。

# 如何使用
1、下载组件  
`npm install react-object-logger`   
2、应用组件  
`import ObjectLogger from 'react-object-logger';`    
`import 'react-object-logger/lib/css/styles.css';`    
3、使用  
`<ObjectLogger logList={this.logList}></ObjectLogger>`  
注意：  
`this.logList`格式及具体字段含义请参考[ObjectLogger](https://github.com/yeecode/ObjectLogger)：  
也可以在本项目示例文件夹下进行对照参考：https://github.com/promise-coding/react-object-logger/tree/master/example/src