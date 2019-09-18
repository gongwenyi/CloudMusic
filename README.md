# 仿网易云音乐客户端
## 声明
本项目参考完全使用最新的react hooks开发，目前只完成部分页面，会持续完成更多功能，主要是想通过项目实战学习到更多东西

本项目参考 [react-cloud-music](https://github.com/sanyuan0704/react-cloud-music) 项目，部分组件直接使用里面的，作者本身完成度就很高了，有很多值得学习的地方，但是没有完全使用react hooks，所以自己重新建了一个项目

本项目Toast，Modal组件参考[react-components](https://github.com/clancysong/react-components)项目实现

本项目服务全部由[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)项目提供，可以查看[在线文档](https://binaryify.github.io/NeteaseCloudMusicApi/#/)


### 打开方式
1、将 **[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)** 项目克隆到本地，然后按照文档说明启动服务

2、将本项目克隆到本地，安装依赖，启动服务，修改*src/api/axios*里面的*baseURL*为第1步服务的地址
``` bash
  git clone https://github.com/gongwenyi/CloudMusic.git
  yarn
  yarn start
```