## 创建项目
```
nest n server
nest g mo user
nest g co user
nest g s user  user/
```

## 安装mongodb依赖
```
yarn add @nestjs/mongoose mongoose
1. 根模块中链接mongodb
2. 创建schema
3. 在模块中使用
4. service中注入Model
5. 编写interface
```

## 安装密码加密工具
```
yarn add md5
```

## 操作cookie
```
yarn add cookie-parser
```

## 设置静态文件，虚拟路径
```
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/static/',
  });
```